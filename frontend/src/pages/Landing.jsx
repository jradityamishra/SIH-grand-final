import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    if (user !== null) {
      user.user.role === "teacher"
        ? navigate("/teacher/dashboard")
        : navigate("/student/dashboard");
    }
  }, [systemUser, navigate]);

  return (
    <>
      {systemUser ? (
        <>
          <div>
            {/* <Link to="/teacher/dashboard">
              <Button>Teacher Dashboard</Button>
            </Link>
          </div>
          <br />
          <div>
            <Link to="/student/dashboard">
              <Button>Student Dashboard</Button>
            </Link> */}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Landing;
