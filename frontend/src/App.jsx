import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Chat from "./pages/Chat.jsx";
import TeacherSignup from "./pages/Auth/TeacherSignup";
import StudentSignup from "./pages/Auth/StudentSignup";
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
import OnlineClass from "./pages/teacher/OnlineClass.jsx";

function App() {
  return (
    <>
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

        <Route path="/teacher/analysis" element={<Analysis />} />
      </Routes>
    </>
  );
}

export default App;
