import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/layout/Layout';

const Assignment = () => {
  // State for assignment details
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    descriptionFile: null,
    deadlineDays: 1,
  });

  
  // State for time remaining
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  // State for assignment status
  const [assignmentStatus, setAssignmentStatus] = useState(null);

  // Function to calculate time remaining
  function getTimeRemaining() {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + assignment.deadlineDays);

    const currentTime = new Date();
    const timeDiff = deadline - currentTime;

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else {
      return 'Time expired';
    }
  }

  // Event handler for assignment title change
  const handleTitleChange = (event) => {
    setAssignment({
      ...assignment,
      title: event.target.value,
    });
  };

  // Event handler for assignment description change
  const handleDescriptionChange = (event) => {
    setAssignment({
      ...assignment,
      description: event.target.value,
    });
  };

  // Event handler for uploading description file
  const handleDescriptionFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setAssignment({
      ...assignment,
      descriptionFile: uploadedFile,
    });
  };

  // Event handler for changing deadline days
  const handleDeadlineDaysChange = (event) => {
    const days = parseInt(event.target.value, 10);
    setAssignment({
      ...assignment,
      deadlineDays: days,
    });
  };

  // Function to assign work
  const handlePostSubmit = async () => {
    try {
     
      var formData = new FormData();
      formData.append("file",  assignment.descriptionFile);

      // Upload file to Cloudinary
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dsjmm6114/upload", // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            upload_preset: "chz1skwr", // Replace YOUR_UPLOAD_PRESET with your Cloudinary upload preset
          },
        }
      );

      // Get the public URL of the uploaded file
      const fileUrl = cloudinaryResponse.data.secure_url;

      console.log("File uploaded to Cloudinary:",fileUrl);
        if(fileUrl){
          data()
        }

      
      const data=async()=>{
        try{
          const mydata=await axios.post('/api/v1/assignmentUpload',{
            title:assignment.title,
            description:assignment.description,
            descriptionFile:fileUrl,
            deadlineDays:assignment.deadlineDays
          })
          if(mydata){
            console.log(mydata)
          }
        }catch(err){
          console.log(err.msg)
        }
      }
      // Handle additional logic as needed

      // Reset the form
    

      alert("File uploaded to Cloudinary.");
    } catch (error) {
      console.log("Error uploading file to Cloudinary:", error);
      
    }
  };

  return (
    <Layout>
    <div className=" bg-gradient-to-tr from-sky-300 via-violet-600 to-sky-700">
      <div className="flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-md p-8 max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Assignment Upload</h1>

          {/* Assignment Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Assignment Title
            </label>
            <input
              id="title"
              type="text"
              value={assignment.title}
              onChange={handleTitleChange}
              className="border p-2 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Title Here"
            />
          </div>

          {/* Additional Information */}
          <div className="bg-gray-200 p-4 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
            <p className="text-gray-700">Student ko dikhega...</p>
          </div>

          {/* Assignment Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Assignment Description
            </label>
            <textarea
              id="description"
              value={assignment.description}
              onChange={handleDescriptionChange}
              className="border p-2 w-full mt-1 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              placeholder="Write your assignment description here..."
            ></textarea>
          </div>

          {/* Additional Information */}
          <div className="bg-gray-200 p-4 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
            <p className="text-gray-700">Student ko dikhega...</p>
          </div>

          {/* Description File Upload */}
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-600">
              Upload description file (PDF)
            </label>
            <input
              id="file"
              type="file"
              accept=".pdf"
              onChange={handleDescriptionFileUpload}
              className="border p-2 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Deadline Days */}
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-600">
              Set deadline in days
            </label>
            <input
              id="deadline"
              type="number"
              value={assignment.deadlineDays}
              onChange={handleDeadlineDaysChange}
              className="border p-2 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          {/* Additional Information */}
          <div className="bg-gray-200 p-4 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
            <p className="text-gray-700">Student ko dikhega...</p>
          </div>

          {/* Time Remaining */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-1/2">
              <p className="text-gray-600">Time remaining to submit: {timeRemaining}</p>
            </div>
            <div className="w-1/2 text-right">
              {/* Assign Work Button */}
              <button
                onClick={handlePostSubmit}
                disabled={timeRemaining === 'Time expired' || !assignment.description}
                className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none hover:bg-blue-700"
              >
                Assign Work
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
            
          >
            Submit Assignment
          </button>
        </div>

          {/* Assignment Status */}
          {assignmentStatus && (
            <div className="mt-4 text-green-600">{assignmentStatus}</div>
          )}
        </div>
      </div>
    </div>
    </Layout>
   
  );
};

export default Assignment;