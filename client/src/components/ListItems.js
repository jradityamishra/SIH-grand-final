import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link to="/teacher/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/teacher/courses">
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItemButton>
    </Link>
    <Link to="/teacher/collaborations">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Collaboration" />
      </ListItemButton>
    </Link>
    <Link to="/teacher/analysis">
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Analysis" />
      </ListItemButton>
    </Link>
    <Link to="/chat">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Mentorship" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

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
  feedback: ["teacher analysis", "students analysis"],
};

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      My Classes
    </ListSubheader>

    {teacher.classes.map((item) => (
      <Link to={`/teacher/class/${item.id}`}>
        <ListItemButton key={item.id}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </Link>
    ))}
  </React.Fragment>
);
