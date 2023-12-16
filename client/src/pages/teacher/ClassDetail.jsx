import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { Divider } from "@mui/material";

const teacher = {
  name: "Teacher",
  email: "teacher@gmail.com",
  image: "https://source.unsplash.com/random",
  phone: "555-1234",
  courses: [
    {
      id: 1,
      title: "Web Development",
      duration: "50 hours",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      thumbnail:
        "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=1060&t=st=1702486800~exp=1702487400~hmac=2cc4ec582d4daff94f7bfe35fe3d623a5a6cafce72b0d704c6d5054ff37a1c17",
      chapters: ["html", "css", "js", "react", "nodejs", "express", "mongodb"],
    },
    {
      id: 2,
      title: "Blockchain",
      duration: "40 hours",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
      thumbnail:
        "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=1060&t=st=1702486800~exp=1702487400~hmac=2cc4ec582d4daff94f7bfe35fe3d623a5a6cafce72b0d704c6d5054ff37a1c17",
      chapters: ["html", "css", "js", "react", "nodejs", "express", "mongodb"],
    },
  ],
  classes: [
    {
      id: 1,
      name: "Class 1",
      subject: "English",
      students: [
        {
          name: "Student 1",
          email: "student1@gmail.com",
          performance: "matching subject",
        },
        {
          name: "Student 2",
          email: "student2@gmail.com",
          performance: "matching subject",
        },
        {
          name: "Student 3",
          email: "student3@gmail.com",
          performance: "matching subject",
        },
      ],
    },
    {
      id: 2,
      name: "Class 2",
      subject: "Maths",
      students: [
        {
          name: "Student 1",
          email: "student1@gmail.com",
          performance: "matching subject",
        },
        {
          name: "Student 2",
          email: "student2@gmail.com",
          performance: "matching subject",
        },
        {
          name: "Student 3",
          email: "student3@gmail.com",
          performance: "matching subject",
        },
      ],
    },
    {
      id: 3,
      name: "Class 3",
      subject: "Science",
      students: [
        {
          name: "Student 1",
          email: "student1@gmail.com",
          performance: "matching subject",
        },
        {
          name: "Student 2",
          email: "student2@gmail.com",
          performance: "matching subject",
        },
        {
          name: "Student 3",
          email: "student3@gmail.com",
          performance: "matching subject",
        },
      ],
    },
  ],
  feedback: ["techer analysis", "students analysis"],
};
const ClassDetail = () => {
  const { id } = useParams();

  // State to manage posts and form values
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const [postFile, setPostFile] = useState(null);

  const selectedClass = teacher.classes.find(
    (classItem) => classItem.id === parseInt(id)
  );

  // Handle post submission
  const handlePostSubmit = (event) => {
    event.preventDefault();

    // Create a new post object
    const newPost = {
      text: postText,
      file: postFile,
    };

    // Update the posts state with the new post
    setPosts([...posts, newPost]);

    // Reset form values
    setPostText("");
    setPostFile(null);
  };

  return (
    <Layout>
      <h2 className="text-3xl font-semibold text-center">
        {selectedClass.name}
      </h2>
      <div className="w-full p-4  flex flex-row flex-wrap justify-center">
        <div className="w-4/5 flex flex-row flex-wrap justify-center ">
          <div className="w-full text-center flex flex-row hover:cursor-pointer">
            <button
              className="hover:bg-gray-300 bg-gray-100  p-3 w-full text-xl  font-semibold"
              href=""
            >
              Classroom
            </button>
            <Divider />
            <button
              className="hover:bg-gray-300 bg-gray-100  p-3 w-full text-xl  font-semibold"
              href=""
            >
              Students
            </button>
          </div>
          <div className="w-full">
            <div className="bg-white w-full shadow rounded-lg p-5">
              {/* Post form */}
              <form onSubmit={handlePostSubmit} className="flex flex-col mb-4">
                <textarea
                  className="bg-gray-200 w-full rounded-lg shadow border p-2"
                  rows="5"
                  placeholder="Speak your mind"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                ></textarea>
                {/* File input for attaching files */}
                <input
                  className="my-2 "
                  type="file"
                  accept="image/*,.pdf, .doc, .docx, .ppt, .pptx"
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
              <Divider />
              {/* Display posts */}
              <h4 className="text-xl font-semibold my-4">Timeline</h4>
              {posts.map((post, index) => (
                <div
                  key={index}
                  className="my-1 flex flex-col p-1 rounded bg-gray-100 border-gray-200 border"
                >
                  <div>
                    <div className="bg-white border-white rounded-lg  p-5 text-xl text-gray-700 content-center font-semibold flex flex-row flex-wrap">
                      <div className="w-full">{post.text}</div>
                    </div>
                    {post.file && (
                      <img
                        className="border rounded-lg shadow-lg h-72 mx-auto my-2"
                        src={URL.createObjectURL(post.file)}
                        alt="Attached file"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClassDetail;
