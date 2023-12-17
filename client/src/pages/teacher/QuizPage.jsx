import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./Quiz.css";
import axios from "axios";
import Layout from "../../components/layout/Layout";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const location = useLocation();
  const [score, setScore] = useState(0);
  const { questions, answers } = location.state;

  useEffect(() => {
    if (!questions || !answers) {
      console.error("Questions or answers not found in location state.");

      return;
    }

    console.log("MCQ Questions:", questions);
    questions.forEach((question) => {
      console.log(`${question.question}`);
      question.options.forEach((option, optionIndex) => {
        console.log(`${option} ${optionIndex + 1}: ${option}`);
      });
    });
  }, [questions, answers]);

  const handleOptionSelect = (selectedOption) => {
    if (!selectedOption) {
      return;
    }

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Last question, submit the quiz
      handleQuizSubmit();
    }
  };

  const handleQuizSubmit = async () => {
    const score = questions.reduce((totalScore, question, index) => {
      return userAnswers[index] === answers[index]
        ? totalScore + 1
        : totalScore;
    }, 0);

    console.log("Score:", score);
    setShowResult(true);
    setScore(score);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/video/credits",
        {
          amount: score,
        }
      );

      console.log("Increase Credits API Response:", response.data);
    } catch (error) {
      console.error("Error making API call to increase credits:", error);
    }
  };

  const calculateUserErrors = () => {
    return questions.reduce((errorCount, question, index) => {
      return userAnswers[index] !== answers[index]
        ? errorCount + 1
        : errorCount;
    }, 0);
  };

  return (
    <Layout>
      <div className="quiz-container shadow-md rounded-md">
        {currentQuestionIndex < questions.length && !showResult && (
          <div className="question-container">
            <p className="question-text">{`${currentQuestionIndex + 1}. ${
              questions[currentQuestionIndex].question
            }`}</p>
            <div className="options-container mt-5">
              {questions[currentQuestionIndex].options.map(
                (option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`option ${
                      userAnswers[currentQuestionIndex] === option.charAt(0)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleOptionSelect(option.charAt(0))}
                  >
                    {option}
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {showResult && (
          <div className="result-container">
            <Card className="result-card bg-blue-500   my-3 text-center">
              <CardContent className=" bg-blue-300 text-white">
                <Typography variant="h5" component="div">
                  Your Score is {score}/6
                </Typography>
              </CardContent>
            </Card>
            <p className="result-text">
              {calculateUserErrors() === 0 ? (
                <span className="text-green-600">
                  Congratulations! You answered all questions correctly.
                </span>
              ) : (
                <>
                  <span className="text-red-400 ">{`You made ${calculateUserErrors()} error(s).`}</span>
                  <br />
                  <ul>
                    {questions.map(
                      (question, index) =>
                        userAnswers[index] !== answers[index] && (
                          <li key={index}>
                            {index + 1}. {question.question}
                            <br />
                            <strong>Your Answer:</strong>{" "}
                            {`${question.options.find(
                              (opt) => opt.charAt(0) === userAnswers[index]
                            )}`}
                            <br />
                            <strong>Correct Answer:</strong>{" "}
                            {`${question.options.find(
                              (opt) => opt.charAt(0) === answers[index]
                            )}`}
                          </li>
                        )
                    )}
                  </ul>
                </>
              )}
            </p>
          </div>
        )}
        <Link to="/teacher/courses">Continue learning</Link>
      </div>
    </Layout>
  );
};

export default Quiz;
