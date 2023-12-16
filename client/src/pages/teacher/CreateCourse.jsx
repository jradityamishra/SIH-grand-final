import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; // Import toast notifications
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/layout/Layout";
import Spinner from "../../components/Spinner";
const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [question, setQuestion] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleVideoUpload = async () => {
    try {
      
      const response = await axios.post("/api/upload/video", { video });

      // Assuming successful response, notify the user
      toast.success("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Error uploading video. Please try again.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    // try {
    //   axios.post("/api/teacher/createcourse", { title, description, summary, video, thumbnail })
    //       .then((response) => {
    //           console.log(response.data);
    //       });
    // } catch (error) {
    //   console.log(error);
    // }
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
          {/* Video Upload Input Field */}
          <FormControl fullWidth margin="normal">
            <InputLabel className="mt-8">Upload Video</InputLabel>
            <Input
              type="file"
              inputProps={{ accept: "video/*" }}
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </FormControl>

          {/* Video Link Input Field */}
          <TextField
            fullWidth
            label="Video Link"
            margin="normal"
            value={video ? video.name : ""}
            disabled
          />

          <Button
            variant="contained"
            style={{ marginTop: "8px" }}
            onClick={handleVideoUpload}
          >
            Upload Video
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateCourse;
