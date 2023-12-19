import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Chat from "./pages/Chat.js";
import TeacherSignup from "./pages/Auth/TeacherSignup.js";
import StudentSignup from "./pages/Auth/StudentSignup.js";
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
import GenerateNotes from "./pages/teacher/GenerateNotes";
import StDashboard from "./pages/student/StDashboard";
import StCourse from "./pages/student/StCourse";
import StMentorship from "./pages/student/StMentorship";
import StAnalysis from "./pages/student/StAnalysis";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/teachersignup" element={<TeacherSignup />} />
        <Route path="/studentsignup" element={<StudentSignup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/onlineclass" element={<OnlineClass />} />

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
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/teacher/editor" element={<EditorPage />} />
        <Route path="/teacher/analysis" element={<Analysis />} />
        <Route path="/teacher/generate" element={<GenerateNotes />} />

        {/* student protected routes */}
        <Route path="/student/dashboard" element={<StDashboard />} />
        <Route path="/student/courses" element={<StCourse />} />
        <Route path="/student/analysis" element={<StAnalysis />} />
        <Route path="/student/mentorship" element={<StMentorship />} />
      </Routes>
    </div>
  );
};

export default App;
