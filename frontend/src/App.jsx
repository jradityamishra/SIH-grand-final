import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Chat from "./pages/Chat.jsx";
import TeacherSignup from "./pages/Auth/TeacherSignup";
import StudentSignup from "./pages/Auth/StudentSignup";
import Landing from "./pages/Landing";
import Dashboard from "./pages/teacher/Dashboard";
import Collab from "./pages/teacher/Collab";
// import Mentorship from "./pages/teacher/Mentorship";
import Course from "./pages/teacher/Course";
import CreateCourse from "./pages/teacher/CreateCourse";
import CollabDetail from "./pages/teacher/CollabDetail";
import CourseDetail from "./pages/teacher/CourseDetail";
import Analysis from "./pages/Analysis";
import Profile from "./pages/teacher/Profile";
import EditorPage from "./pages/teacher/EditorPage";
import GenerateNotes from "./pages/teacher/GenerateNotes";
import OnlineClass from "./pages/teacher/OnlineClass.jsx";
import Forum from "./pages/teacher/Forum";

import StDashboard from "./pages/student/StDashboard";
import StCourse from "./pages/student/StCourse";
import StMentorship from "./pages/student/StMentorship";
import StAnalysis from "./pages/student/StAnalysis";
import PublicProfile from "./pages/PublicProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/teacher/chat" element={<Chat />} />
        <Route path="/teachersignup" element={<TeacherSignup />} />
        <Route path="/studentsignup" element={<StudentSignup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />

        {/* teacher protected routes */}
        <Route path="/teacher/dashboard" element={<Dashboard />} />
        <Route path="/teacher/collaborations" element={<Collab />} />
        <Route
          path="/teacher/collaborations/detail/:id"
          element={<CollabDetail />}
        />
        <Route path="/teacher/onlineclass" element={<OnlineClass />} />
        {/* <Route path="/teacher/mentorship" element={<Mentorship />} /> */}
        <Route path="/teacher/courses" element={<Course />} />
        <Route path="/teacher/courses/:id" element={<CourseDetail />} />
        <Route path="/teacher/createcourse" element={<CreateCourse />} />
        <Route path="/teacher/editor" element={<EditorPage />} />
        <Route path="/teacher/generate" element={<GenerateNotes />} />
        <Route path="/teacher/public-profile/:id" element={<PublicProfile />} />
        <Route path="/teacher/analysis" element={<Analysis />} />
        <Route path="/teacher/mentorship" element={<Forum />} />

        {/* student protected routes */}
        <Route path="/student/dashboard" element={<StDashboard />} />
        <Route path="/student/courses" element={<StCourse />} />
        <Route path="/student/analysis" element={<StAnalysis />} />
        <Route path="/student/mentorship" element={<StMentorship />} />
      </Routes>
    </>
  );
}

export default App;
