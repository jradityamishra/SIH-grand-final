import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import axios from "axios";

const Course = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/lectureUpload/getlecture/"
        );
        setCourses(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className="flex flex-row text-center justify-evenly">
        <h2 className="text-3xl  font-semibold mb-8">My Courses</h2>
        <div>
          <Link to="/teacher/createcourse">
            <Button variant="contained" color="primary">
              create
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((val, k) => (
            <div id="courselist" key={k} className="mx-4">
              <Card variant="outlined" style={{ height: "100%" }}>
                <React.Fragment>
                  <CardContent style={{ height: "100%" }}>
                    <Typography variant="h5" component="div">
                      {val.title}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 16 }}
                      variant="body2"
                      gutterBottom
                    >
                      Video by: {val.creator.name}
                    </Typography>
                    {/* Remove the img tag since there's no thumbnail */}
                    <Typography color="text.secondary">
                      Description: {val.description.substring(0, 50) + "...."}
                      <br />
                    </Typography>
                    <CardActions>
                      <Link to={`/teacher/courses/${val._id}`}>
                        <Button
                          size="small"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Details
                        </Button>
                      </Link>
                    </CardActions>
                  </CardContent>
                </React.Fragment>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Course;
