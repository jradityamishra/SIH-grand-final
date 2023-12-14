import React from "react";
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
const App = () => {
  return (
    <>
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

        <Route path="/teacher/analysis" element={<Analysis />} />
      </Routes>
    </>
  );
};

export default App;
