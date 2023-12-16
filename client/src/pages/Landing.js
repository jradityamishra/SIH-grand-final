import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <>
      <div>
        <Link to="/teacher/dashboard">
          <Button>Teacher Dashboard</Button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
