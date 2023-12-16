// import { promisify } from "util";
// import { exec } from "child_process";
// import path from "path";
// import { fileURLToPath } from "url";
import axios from "axios";
import puppeteer from "puppeteer";
import { v2 as cloudinary } from "cloudinary";
import lectureUploadModel from "../models/lectureUploadModel.js";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const apiKey = process.env.RAPID_API_KEY;
//const execAsync = promisify(exec);

export const getTranscript = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Invalid YouTube video URL" });
    }

    const summary = await requestSummary(description);

    res.json({ summary });
  } catch (error) {
    next(error);
  }
};

const requestSummary = async (text) => {
  const content = `As an instructor, create a detailed HTML study document(only) on this topic:${text}. Utilize bold headings, subheadings, and underlining for emphasis. The HTML should exclude the <title> and <!DOCTYPE HTML> elements and only have a body enclosed within <html> tags, maintaining a clear hierarchy of headings and subheadings`;
  text;
  const options = {
    method: "POST",
    url: "https://chatgpt-42.p.rapidapi.com/matag2",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      web_access: true,
      max_tokens: 2000,
    },
  };

  try {
    const response = await axios.request(options);

    const summary = extractSummary(response.data.result) || "";
    return summary;
  } catch (error) {
    console.error(error);
    return "Summary not available";
  }
};

const extractSummary = (text) => {
  const startIndex = text.indexOf("<");
  const endIndex = text.lastIndexOf(">");
  const extractedSummary = text.substring(startIndex, endIndex + 1);
  return extractedSummary;
};
//games
export const getQuiz = async (req, res, next) => {
  const { id } = req.params;
  const lecture = await lectureUploadModel.findById(id);
  const summary = lecture.summaryContent;
  const content = `${summary}\nGenerate multiple-choice questions and answers based on the above summary(ignore HTML tags).Create 6 questions, each with 4 options numbered using capital letters only. Return a JSON object without comments and special characters, containing two arrays: one for the multiple-choice questions with their options (MCQs) and the other for their corresponding answers(answers) stating the correct option using capital letters.`;
  const options = {
    method: "POST",
    url: "https://chatgpt-42.p.rapidapi.com/matag2",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "chatgpt-42.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      web_access: true,
      max_tokens: 3000,
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

      res.status(200).send(cleanedData);
    } else {
      console.error("Invalid JSON structure");
    }
  } catch (error) {
    next(error);
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

export const generatePdfAndUpload = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { id } = req.params;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content);

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
    });
    await browser.close();

    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "pdfs" },
        async (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            res.status(500).json({ error: "Error uploading to Cloudinary" });
          } else {
            console.log("Cloudinary response:", result);

            const { secure_url, public_id } = result;

            try {
              const updatedDocument =
                await lectureUploadModel.findByIdAndUpdate(
                  id,
                  {
                    $set: {
                      summaryContent: content,
                      pdfLink: secure_url,
                    },
                  },
                  { new: true, useFindAndModify: false }
                );

              if (!updatedDocument) {
                console.error("Document not found");
                res.status(404).json({ error: "Document not found" });
                return;
              }

              res.status(201).send("Save successful");
            } catch (updateError) {
              console.error("Error updating MongoDB document:", updateError);
              next(updateError);
            }
          }
        }
      )
      .end(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
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
