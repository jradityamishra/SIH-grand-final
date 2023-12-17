import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Card, CardContent, Typography, Button } from "@mui/material";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import Spinner from "../../components/Spinner";

import DownloadIcon from "@mui/icons-material/Download";

const LectureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lectureData, setLectureData] = useState({});
  const [loading, setLoading] = useState(true);
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
        // const response1 = await axios.get(
        //   `http://localhost:8000/api/v1/video/quiz/${id}`
        // );
        const response1 = {
          data: {
            MCQs: [
              {
                question:
                  "What is light considered as in the Corpuscular Theory?",
                options: [
                  "A. Waves",
                  "B. Particles called corpuscles",
                  "C. Energy",
                  "D. Photons",
                ],
              },
              {
                question:
                  "What property of light is evident in shadows and camera obscura?",
                options: [
                  "A. Diffraction",
                  "B. Interference",
                  "C. Rectilinear Propagation",
                  "D. Reflection",
                ],
              },
              {
                question:
                  "What happens when light encounters an obstacle or aperture?",
                options: [
                  "A. It stops",
                  "B. It bends and spreads out",
                  "C. It reflects",
                  "D. It disappears",
                ],
              },
              {
                question: "What happens when two light waves overlap?",
                options: [
                  "A. They cancel each other out",
                  "B. They interfere constructively or destructively",
                  "C. They form a rainbow",
                  "D. They increase in intensity",
                ],
              },
              {
                question: "What do the laws of reflection state?",
                options: [
                  "A. The angle of incidence equals the angle of reflection",
                  "B. Light travels in straight lines",
                  "C. Light bends and spreads out when it encounters an obstacle",
                  "D. Light can interfere constructively or destructively",
                ],
              },
              {
                question: "Who proposed the Corpuscular Theory of Light?",
                options: [
                  "A. Einstein",
                  "B. Newton",
                  "C. Maxwell",
                  "D. Planck",
                ],
              },
            ],
            answers: ["B", "C", "B", "B", "A", "B"],
          },
        };

        // if (response1.status === 200 && quizData === "") {
        setQuizData(response1.data);
        console.log("Quiz generation successful", response1.data);
        console.log("MCQ answers:");
        console.log(response1.data.answers);
        response1.data.MCQs.forEach((question) => {
          console.log(question.question);
          console.log(question.options);
        });
        //}
      } catch (error) {
        console.error("Error fetching lecture details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleQuizButtonClick = () => {
    navigate(`/quiz/${id}`, {
      state: {
        questions: quizData.MCQs,
        answers: quizData.answers,
      },
    });
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
                  {videoEnded && quizData && (
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
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LectureDetail;
