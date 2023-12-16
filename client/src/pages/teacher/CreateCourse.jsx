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
import Spinner from "../../components/Spinner";
import EditorPage from "./EditorPage";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleUpload = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("link", link);
      formData.append("lectureUrl", video);

      const response = await axios.post("api/v1/lectureUpload", formData);

      const videoID = link.replace("https://www.youtube.com/watch?v=", "");

      // Get transcript
      const transcriptResponse = await axios.get(
        `api/v1/transcript/${videoID}`
      );

      if (transcriptResponse.data && transcriptResponse.data.summary) {
        setSummary(transcriptResponse.data.summary);
        setLoading(false);
      }

      if (response.status === 201) {
        console.log("success");

        alert("Video upload is successful");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="px-8">
        {loading ? (
          <Spinner />
        ) : summary ? (
          <EditorPage summary={summary} />
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-center">Create Video</h2>
            <form>
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

              <FormControl fullWidth margin="normal">
                <Input
                  label="lecture video"
                  type="file"
                  inputProps={{ accept: "video/*" }}
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </FormControl>

              <TextField
                fullWidth
                label="Lecture Link"
                margin="normal"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <Button
                variant="contained"
                style={{ marginTop: "8px" }}
                onClick={handleUpload}
              >
                Upload Video
              </Button>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default CreateCourse;
