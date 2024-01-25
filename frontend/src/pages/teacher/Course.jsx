import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const courseData = [
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
  {
    id: 3,
    title: "Dynamic programming",
    duration: "10 hours",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    thumbnail:
      "https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=1060&t=st=1702486800~exp=1702487400~hmac=2cc4ec582d4daff94f7bfe35fe3d623a5a6cafce72b0d704c6d5054ff37a1c17",
    chapters: ["html", "css", "js", "react", "nodejs", "express", "mongodb"],
  },
];

const Course = () => {
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

      <div className="grid md:grid-cols-3 gap-8">
        {courseData.map((val, k) => (
          <div id="courselist" key={k} className="mx-4">
            <Card variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {val.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 16 }}
                    variant="body2"
                    gutterBottom
                  >
                    {val.duration}
                  </Typography>
                  <img src={val.thumbnail} alt="" />
                  <Typography color="text.secondary">
                    Description : {val.description}
                    <br />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/teacher/courses/${val.id}`}>
                    <Button
                      size="small"
                      href={val.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Details
                    </Button>
                  </Link>
                </CardActions>
              </React.Fragment>
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Course;
