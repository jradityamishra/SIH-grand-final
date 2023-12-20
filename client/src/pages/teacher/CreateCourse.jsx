import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Input, FormControl, Alert } from "@mui/material";
import Layout from "../../components/layout/Layout";
import Spinner from "../../components/Spinner";
import EditorPage from "./EditorPage";
import { useSelector } from 'react-redux';

const CreateCourse = () => {
  const {user}=useSelector(
    (state) => state.auth
  )

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  //const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [id, setId] = useState("");
  const handleUpload = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      //formData.append("link", link);
      formData.append("lectureUrl", video);

      const uploadPromise = axios.post(
        "/api/v1/lectureUpload",
        formData
      );

      const transcriptPromise = axios.post(
        "/api/v1/video/transcript1", //change transcript
        { description: description }
      );

      const [uploadResponse, transcriptResponse] = await Promise.all([
        uploadPromise,
        transcriptPromise,
      ]);

      if (transcriptResponse.data && transcriptResponse.data.summary) {
        setSummary(transcriptResponse.data.summary);
      }

      if (uploadResponse.status === 201) {
        console.log("success");
        setId(uploadResponse.data.upload._id);
        alert("Video upload is successful");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
   <Layout>
      <div>
        {loading ? (
          <Spinner />
        ) : summary ? (
          <EditorPage summary={summary} id={id} />
        ) : (
          <div className="px-8">
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
                placeholder="List the topics discussed in the video"
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

              {/* <TextField
                fullWidth
                label="Lecture Link"
                margin="normal"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              /> */}

 <Button
                variant="contained"
                style={{ marginTop: "8px" }}
                onClick={handleUpload}
              >
                Upload Video
              </Button>
              <Alert
                severity="info"
                className="my-6 w-full md:w-[90%] lg:w-[65%] "
              >
                Upon successful video upload, the content material will be
                automatically generated.
              </Alert>
            </form>
          </div>
        )}
      </div>
    </Layout>
   </>
  );
};

export default CreateCourse;
