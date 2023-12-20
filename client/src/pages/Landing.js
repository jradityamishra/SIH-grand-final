import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const systemUser = user;

  useEffect(() => {
    // Use the useEffect hook to wait until the component is mounted
    // before redirecting to the login page if there is no user.
    if (!systemUser) {
      navigate("/login");
    }
  }, [systemUser, navigate]);

  return (
    <>
      {
        !user?<Spinner/>:(
          <div>
      { user.user.role=='teacher'? <Link to="/teacher/dashboard">
          <Button>Teacher Dashboard</Button>
        </Link>:
        <Link to="/student/dashboard">
          <Button>Student Dashboard</Button>
                     </Link>}
      </div>
        )
      }
    </>
  );
};

export default Landing;
