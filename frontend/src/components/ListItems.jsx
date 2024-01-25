import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import GrainIcon from "@mui/icons-material/Grain";
import LiveTvIcon from "@mui/icons-material/LiveTv";

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
    <Link to="/teacher/chat">
      <ListItemButton>
        <ListItemIcon>
          {" "}
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Community" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* {teacher.classes.map((item) => ( */}
    <Link to="/teacher/mentorship">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Headlines" />
      </ListItemButton>
    </Link>
    <Link to="/teacher/onlineclass">
      <ListItemButton>
        <ListItemIcon>
          <LiveTvIcon />
        </ListItemIcon>
        <ListItemText primary="Live class" />
      </ListItemButton>
    </Link>
    {/* ))} */}
    <Divider />
    <Link to="/teacher/generate">
      <ListItemButton>
        <ListItemIcon>
          <GrainIcon />
        </ListItemIcon>
        <ListItemText primary="AI tools" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const studentListItems = (
  <React.Fragment>
    <Link to="/student/dashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link to="/student/courses">
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Courses" />
      </ListItemButton>
    </Link>
    <Link to="/student/analysis">
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Analysis" />
      </ListItemButton>
    </Link>
    <Link to="/student/mentorship">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Mentorship" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
