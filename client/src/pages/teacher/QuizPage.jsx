import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = ({ mcq }) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    console.log("MCQ Questions:");
    mcq.MCQs.forEach((question, index) => {
      console.log(`${index + 1}. ${question.question}`);
      console.log("Options:");
      question.options.forEach((option, optionIndex) => {
        console.log(`  ${optionIndex + 1}. ${option}`);
      });
      console.log("Correct Answer:", mcq.answers[index]);
      console.log("-----------");
    });
  }, [mcq]);

  const handleOptionSelect = (selectedOption) => {
    if (!selectedOption) {
      return;
    }

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));

    if (currentQuestionIndex < mcq.MCQs.length - 1) {
      // Move to the next question
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Last question, submit the quiz
      handleQuizSubmit();
    }
  };

  const handleQuizSubmit = () => {
    setShowResult(true);
    console.log("User Answers:", userAnswers);

    // Calculate total score
    const score = mcq.MCQs.reduce((totalScore, question, index) => {
      return userAnswers[index] === mcq.answers[index]
        ? totalScore + 1
        : totalScore;
    }, 0);
    console.log("Score:", score);
  };

  const calculateUserErrors = () => {
    return mcq.MCQs.reduce((errorCount, question, index) => {
      return userAnswers[index] !== mcq.answers[index]
        ? errorCount + 1
        : errorCount;
    }, 0);
  };

  return (
    <div className="quiz-container">
      {currentQuestionIndex < mcq.MCQs.length && !showResult && (
        <div className="question-container">
          <p className="question-text">{`${currentQuestionIndex + 1}. ${
            mcq.MCQs[currentQuestionIndex].question
          }`}</p>
          <div className="options-container mt-5">
            {mcq.MCQs[currentQuestionIndex].options.map(
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
          <p className="result-text">
            {calculateUserErrors() === 0 ? (
              <span className="text-green-600">
                Congratulations! You answered all questions correctly.
              </span>
            ) : (
              <>
                <span className="text-red-400">{`You made ${calculateUserErrors()} error(s).`}</span>
                <br />
                <ul>
                  {mcq.MCQs.map(
                    (question, index) =>
                      userAnswers[index] !== mcq.answers[index] && (
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
                            (opt) => opt.charAt(0) === mcq.answers[index]
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
    </div>
  );
};

export default Quiz;
