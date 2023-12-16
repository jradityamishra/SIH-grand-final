import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/teacher/Dashboard";
import Collab from "./pages/teacher/Collab";
import Mentorship from "./pages/teacher/Mentorship";
import Course from "./pages/teacher/Course";
import CreateCourse from "./pages/teacher/CreateCourse";
import CollabDetail from "./pages/teacher/CollabDetail";
import CourseDetail from "./pages/teacher/CourseDetail";
import Analysis from "./pages/Analysis";
import Profile from "./pages/teacher/Profile";
import EditorPage from "./pages/teacher/EditorPage";
import ClassDetail from "./pages/teacher/ClassDetail";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/profile" element={<Profile />} />

        {/* teacher protected routes */}
        <Route path="/teacher/dashboard" element={<Dashboard />} />
        <Route path="/teacher/collaborations" element={<Collab />} />
        <Route
          path="/teacher/collaborations/detail/:id"
          element={<CollabDetail />}
        />
        <Route path="/teacher/mentorship" element={<Mentorship />} />
        <Route path="/teacher/courses" element={<Course />} />
        <Route path="/teacher/courses/:id" element={<CourseDetail />} />
        <Route path="/teacher/createcourse" element={<CreateCourse />} />
        <Route path="/teacher/class/:id" element={<ClassDetail />} />

        <Route path="/teacher/editor" element={<EditorPage />} />
        <Route path="/teacher/analysis" element={<Analysis />} />
      </Routes>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default App;
