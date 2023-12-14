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
    "you are a teacher tasked with preparing study material. Write a summary in 600 words with headings and subheadings, based on the transcript of the provided video:" +
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
    "Daffodils is a famous poem written by William Wordsworth, a prominent English Romantic poet. The poem was composed in 1804 and published in 1807 as part of a collection titled 'Poems in Two Volumes.' It is often known by its first line, 'I wandered lonely as a cloud.'The poem is a lyrical expression of the poet's encounter with a field of golden daffodils beside a lake. Wordsworth vividly describes the beauty of nature and the impact it has on the human soul. The sight of the dancing daffodils, fluttering and stretching in the breeze, fills the poet with a sense of joy and inspiration.The poem emphasizes the power of nature to elevate the human spirit and provide solace. It explores the idea that memories of natural beauty can bring comfort and happiness during moments of solitude. The image of the 'host of golden daffodils' becomes a source of enduring joy and inspiration for the poet, serving as a mental refuge that continues to uplift him even in moments of loneliness.Overall, 'Daffodils' is a celebration of the beauty of the natural world and its ability to leave a lasting impact on the human psyche. The poem is characterized by its vivid imagery, emotional intensity, and the theme of the restorative power of nature.";
  const content = `${summary}\nGenerate multiple-choice questions and answers based on the above summary.Create 6 questions, each with 4 options. Return a JSON object without comments and special characters, containing two arrays: one for the multiple-choice questions with their options (MCQs) and the other for their corresponding answers(answers) stating the correct option using capital letters.`;
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
