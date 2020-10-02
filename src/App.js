import React, { useState } from "react";
import "./App.css";
import { questions } from "./data";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Answers from "./components/Answers";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const question = questions[currentQuestion];
  const [showResults, setShowResults] = useState(false);

  const handleClick = (e) => {
    setCurrentAnswer(e.target.value);
    setError("");
  };
  //console.log(currentAnswer);

  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  const next = () => {
    const answer = {
      questionId: question.id,
      answer: currentAnswer,
    };

    if (!currentAnswer) {
      setError("Please select an option");
      return;
    }

    answers.push(answer);
    setAnswers(answers);
    setCurrentAnswer("");
    console.log(answers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      return;
    }

    setShowResults(true);
  };

  const restart = () => {
    setAnswers([]);
    setCurrentAnswer("");
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const renderResultsData = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.id === answer.questionId
      );

      return (
        <div key={question.id}>
          {question.question} - {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const renderResultMark = (question, answer) => {
    if (question.correct_answer === answer.answer) {
      return <span className="correct">Correct</span>;
    }
    return <span className="failed">Failed</span>;
  };

  if (showResults) {
    return (
      <div className="container results">
        <h2>Results Here</h2>
        <ul>{renderResultsData()}</ul>
        <button className="btn btn-primary" onClick={restart}>
          Restart Quiz
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Progress total={questions.length} current={currentQuestion + 1} />
        <Question question={question.question} />
        {renderError()}
        <Answers
          question={question}
          currentAnswer={currentAnswer}
          handleClick={handleClick}
        />
        <button className="btn btn-primary" onClick={next}>
          Confirm and contineue
        </button>
      </div>
    );
  }
}

export default App;
