import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/material";
import axios from "axios";

const teacher = {
  // ... (unchanged)
};

const ClassDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // State to manage posts and form values
  const [postFile, setPostFile] = useState(null);

  // Handle post submission
  const handlePostSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", postFile);
      console.log(postFile);
      console.log(formData);
      const response = await axios.post(
        "http://localhost:8000/api/v1/assignmentUpload",
        formData
      );
      if (response.status === 201) {
        console.log("success");
        alert("File uploaded...");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* ... (unchanged) */}
      <form onSubmit={handlePostSubmit} className="flex flex-col mb-4">
        {/* File input for attaching files */}
        <input
          className="my-2"
          type="file"
          accept=".pdf" // Set accepted file types to PDF
          onChange={(e) => setPostFile(e.target.files[0])}
        />
        <div className="w-full flex flex-row flex-wrap mt-3">
          <button
            type="submit"
            className="float-right bg-indigo-400 hover:bg-indigo-300 text-white p-2 rounded-lg"
          >
            {"Post ->"}
          </button>
        </div>
      </form>
      {/* ... (unchanged) */}
    </Layout>
  );
};

export default ClassDetail;
