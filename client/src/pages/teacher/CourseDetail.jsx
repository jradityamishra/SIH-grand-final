import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import Spinner from "../../components/Spinner";
import QuizPage from "./QuizPage";
import DownloadIcon from "@mui/icons-material/Download";

const LectureDetail = () => {
  const { id } = useParams();
  const [lectureData, setLectureData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoEnded, setVideoEnded] = useState(true);
  const [quizData, setQuizData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/lectureUpload/getlecturedetails/${id}`
        );
        setLectureData(response.data.lecture);
        setLoading(false);
        const response1 = await axios.get(
          `http://localhost:8000/api/v1/video/quiz/${id}`
        );
        if (response1.status === 200) {
          setQuizData(response1.data);
          console.log("Quiz generation successful", response1.data);
        }
      } catch (error) {
        console.error("Error fetching lecture details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleQuizButtonClick = () => {
    setShowQuiz(true);
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <Layout>
      <div className="justify-center m-8">
        {loading ? (
          <Spinner />
        ) : (
          <div>
            {showQuiz && quizData !== "" ? (
              <QuizPage mcq={quizData} />
            ) : (
              <Card className="flex flex-col md:flex-row md:justify-evenly justify-center">
                <div>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      Lecture Topic: {lectureData.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Lecture Description: {lectureData.description}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      Creator: {lectureData.creator.name}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      Creator's Experience:{" "}
                      {lectureData.creator.yearsOfExperience} years
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      Subjects Taught: {lectureData.creator.subjects.join(", ")}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                      <a
                        href={`${lectureData.pdfLink.replace(
                          "/upload/",
                          `/upload/fl_attachment:${lectureData.title}`
                        )}`}
                        className="font-bold p-2 shadow-md rounded-md"
                        target="_blank"
                        rel="noopener noreferrer"
                        download={`${lectureData.title}.pdf`}
                      >
                        <DownloadIcon className="mr-2 " />
                        Download PDF
                      </a>
                    </Typography>
                    {!showQuiz && videoEnded && quizData && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleQuizButtonClick}
                      >
                        Do you want to answer questions on this topic?
                      </Button>
                    )}
                  </CardContent>
                </div>
                <div>
                  <video
                    width="560"
                    height="315"
                    controls
                    src={lectureData.lectureUrl}
                    title="Lecture Video"
                    onEnded={handleVideoEnd}
                  ></video>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LectureDetail;
