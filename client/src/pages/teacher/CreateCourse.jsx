import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import Layout from "../../components/layout/Layout";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [summary, setSummary] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    // try {
    //   axios
    //     .post("/api/teacher/createcourse", {
    //       title,
    //       description,
    //       summary,
    //       video,
    //       thumbnail,
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const summarize = async () => {
    const url = "https://summarize-texts.p.rapidapi.com/pipeline";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "2b85d90714msh1d7ece47b8e8220p1c55a4jsnb14b38250f0a",
        "X-RapidAPI-Host": "summarize-texts.p.rapidapi.com",
      },
      body: JSON.stringify({
        input: summary,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json(); // Assuming the response is in JSON format
      console.log(data.output[0].text);
      setSummary(data.output[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="px-8">
        <h2 className="text-3xl font-semibold text-center">Upload lecture</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Lecture Title"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Lecture Description"
            margin="normal"
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-row gap-8 items-center justify-evenly">
            <TextField
              label="Summary"
              margin="normal"
              multiline
              fullWidth
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <div>
              <Button variant="contained" onClick={summarize}>
                Generate with AI
              </Button>
            </div>
          </div>
          <FormControl fullWidth margin="normal">
            <InputLabel className="mt-8">Upload Video</InputLabel>
            <Input
              type="file"
              inputProps={{ accept: "video/*" }}
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel className="mt-8">Upload Thumbnail</InputLabel>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </FormControl>
          <TextField
            style={{ marginTop: "24px" }}
            fullWidth
            label="Related Questions"
            margin="normal"
            multiline
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button variant="contained" style={{ marginTop: "24px" }}>
            create
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCourse;
