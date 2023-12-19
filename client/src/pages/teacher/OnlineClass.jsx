import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  postLiveclassData,
  getLiveClassData,
} from "../../redux/liveClassSlice";
// import { toast } from 'react-toastify';
const OnlineClass = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log("techer data:", user.user);
  const teacherId = user.user._id;
  console.log(teacherId);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState(user.user.subjectsTaught);
  const [time, setTime] = useState("");

  const formData = {
    link,
    description,
    subject,
    time,
  };

  // ================SAVE DATA==================

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post(`/api/v1/liveclass/${teacherId}`, {
        description: description,
        joiningLink: link,
        subject: subject,
        Time: time,
      });
      console.log("resget:", res);
      if (res) {
        alert("Your data is Save");
      }
    } catch (error) {
      console.log(error);
      alert(error.message || "error in saving live Class detail ");
    }
  };

  // ================START CLASS==================

  const startclass = () => {};

  return (
    <div className="ml-56">
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <div className="bg-blue-500 text-white py-4 text-center">
          <h1 className="text-4xl font-bold">Live Classes</h1>
        </div>

        <div className="container mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl max-w-2xl">
          <div className="mb-6">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            {user.user.role === "Teacher" ? (
              <input
                id="subject"
                type="subject"
                placeholder={user.user.subjectsTaught}
                value={user.user.subjectsTaught}
                //  onChange={(e)=>setSubject(e.target.value)}
                // onChange=(setSubject(value)}
                className="border p-3 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            ) : (
              ""
            )}
          </div>

          <div className="bg-gray-200 p-6 mt-2 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">
              Additional Information
            </h2>
            <p className="text-gray-700">Student ko dikhega...</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            {user.user.role === "Teacher" ? (
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border p-3 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            ) : (
              ""
            )}
          </div>

          <div className="bg-gray-200 p-6 mt-2 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">
              Additional Information
            </h2>
            <p className="text-gray-700">Student ko dikhega...</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Paste Links/URLs
            </label>
            {user.user.role === "Teacher" ? (
              <input
                id="link"
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="border p-3 w-full mt-1 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Paste links here..."
              />
            ) : (
              ""
            )}
          </div>

          <div className="bg-gray-200 p-6 mt-2 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">
              Additional Information
            </h2>
            <p className="text-gray-700">Student ko dikhega...</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            {user.user.role === "Teacher" ? (
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-3 w-full mt-1 rounded-md resize-none focus:outline-none focus:ring focus:border-blue-300"
                rows="6"
                placeholder="Write your description here..."
              ></textarea>
            ) : (
              ""
            )}
          </div>

          <div className="bg-gray-200 p-6 mt-2 mb-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2">
              Additional Information
            </h2>
            <p className="text-gray-700">Student ko dikhega...</p>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-blue-600 text-white mt-4 py-4 px-10 text-xl rounded-md font-bold hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={handleSubmit}
            >
              Save Data
            </button>
            <button
              className="bg-blue-600 text-white mt-4 py-4 px-10 text-xl rounded-md font-bold hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={startclass}
            >
              Start your Class
            </button>
          </div>
        </div>

        <div className="bg-blue-500 text-white py-4 text-center mt-10">
          <p>&copy; 2023 Live Classes. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default OnlineClass;
