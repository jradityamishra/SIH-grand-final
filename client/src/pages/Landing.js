import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


const Landing = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const systemUser = user;

  useEffect(() => {
    // Use the useEffect hook to wait until the component is mounted
    // before redirecting to the login page if there is no user.
    if (!systemUser) {
      navigate('/login');
    }
  }, [systemUser, navigate]);

  return (
    <>
      {systemUser ? (
        <div>
          <Link to="/teacher/dashboard">
            <Button>Teacher Dashboard</Button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Landing;
