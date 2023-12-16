import { promisify } from "util";
import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apiKey = process.env.RAPID_API_KEY;
const execAsync = promisify(exec);

export const getTranscript = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Invalid YouTube video URL" });
  }

  const p = path.join(__dirname, "transcript.py");

  try {
    const command = `python ${p} ${id}`;
    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(400).send("Bad Request");
    }

    const transcript = stdout;

    const truncatedTranscript = truncateToMaxWords(transcript, 3800);

    const summary = await requestSummary(truncatedTranscript);

    res.json({ summary });
  } catch (error) {
    next(error);
  }
};

const truncateToMaxWords = (text, maxWords) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ");
  }
  return text;
};

const requestSummary = async (text) => {
  const content =
    "you are a teacher tasked with preparing study material. Write a summary in 600 words in html format with bold headings,subheadings and important words underline, based on this video transcript:" +
    text;
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationgpt",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      web_access: true,
    },
  };

  try {
    const response = await axios.request(options);

    const summary = response.data.result || "";
    return summary;
  } catch (error) {
    console.error(error);
    return "Summary not available";
  }
};
export const getQuiz = async (req, res, next) => {
  const summary =
    "The Khilji Dynasty, which ruled parts of the Indian subcontinent during the medieval period, emerged in the 13th century. Its founder, Jalal-ud-din Khilji, ascended the throne in 1290 after the decline of the Delhi Sultanate's Slave Dynasty. The most prominent ruler of the Khilji Dynasty was Alauddin Khilji, who took power in 1296. Alauddin is best known for his military prowess and administrative reforms.Under Alauddin Khilji's rule, the Khilji Dynasty expanded its territory through successful military campaigns. The most notable conquest was the invasion of the Deccan region, bringing significant portions of southern India under Delhi's control. Alauddin Khilji implemented economic and administrative reforms, including the market control system and land revenue assessments.The dynasty faced internal strife and external threats, and after Alauddin's death in 1316, it witnessed a period of decline. The last ruler of the Khilji Dynasty, Qutb-ud-din Mubarak Shah, faced challenges from rival factions, ultimately leading to the end of the dynasty in 1320. Despite its relatively short-lived existence, the Khilji Dynasty left a lasting impact on the political and cultural landscape of medieval India.";
  const content = `${summary}\nGenerate multiple-choice questions and answers based on the above summary(ignore HTML tags).Create 6 questions, each with 4 options. Return a JSON object without comments and special characters, containing two arrays: one for the multiple-choice questions with their options (MCQs) and the other for their corresponding answers(answers) stating the correct option using capital letters.`;
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationgpt",

    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      web_access: true,
    },
  };
  try {
    const { data } = await axios.request(options);

    const rawData = data.result;
    console.log(rawData);
    const jsonStartIndex = rawData.indexOf("{");

    const jsonEndIndex = rawData.lastIndexOf("}");

    if (
      jsonStartIndex !== -1 &&
      jsonEndIndex !== -1 &&
      jsonStartIndex < jsonEndIndex
    ) {
      const cleanedData = rawData.slice(jsonStartIndex, jsonEndIndex + 1);

      res.send(cleanedData);
    } else {
      console.error("Invalid JSON structure");
    }
  } catch (error) {
    next(error);
  }
};
//this is the format of result being returned:
/*
{
"MCQs": [
{
"question": "Who is the author of the poem 'Daffodils'?",
"options": [
"William Wordsworth",
"John Keats",
"Samuel Taylor Coleridge",
"Lord Byron"
]
},
{
"question": "When was the poem 'Daffodils' composed?",
"options": [
"1804",
"1807",
"1819",
"1820"
]
},
{
"question": "What is the famous first line of the poem 'Daffodils'?",
"options": [
"I wandered lonely as a cloud.",
"Nature's beauty knows no bounds.",
"In a field of golden daffodils.",
"The lake mirrored the golden sunset."
]
},
{
"question": "What does the poem 'Daffodils' celebrate?",
"options": [
"The beauty of the natural world",
"The power of love",
"The importance of friendship",
"The pursuit of knowledge"
]
},
{
"question": "What does the poet feel upon seeing the daffodils?",
"options": [
"Joy and inspiration",
"Sadness and regret",
"Fear and anxiety",
"Anger and frustration"
]
},
{
"question": "What does the poem 'Daffodils' emphasize?",
"options": [
"The restorative power of nature",
"The dangers of solitude",
"The insignificance of human life",
"The futility of artistic expression"
]
}
],
"answers": [
"A",
"A",
"A",
"A",
"A",
"A"
]
}
*/
