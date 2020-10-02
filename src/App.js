import React, { useReducer } from "react";
import "./App.css";
import { questions } from "./data";
import Progress from "./components/Progress";
import Question from "./components/Question";
import Answers from "./components/Answers";

import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
} from "./Reducers/Types";
import quizReducer from "./Reducers/Reducer";
function App() {
  const initialState = {
    currentQuestion: 0,
    currentAnswer: "",
    answers: [],
    showResults: false,
    error: "",
  };
  /*
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const question = questions[currentQuestion];
  const [showResults, setShowResults] = useState(false);
  */
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error } = state;
  const question = questions[currentQuestion];
  /*
  const handleClick = (e) => {
    //setCurrentAnswer(e.target.value);
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: e.target.value });
    //setError("");
    dispatch({ type: SET_ERROR, error: "" });
  };
  */
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
      //setError("Please select an option");
      dispatch({ type: SET_ERROR, error: "Please select an option" });
      return;
    }

    answers.push(answer);

    //setAnswers(answers);
    dispatch({ type: SET_ANSWERS, answers: answers });

    //setCurrentAnswer("");
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: "" });
    //console.log(answers);

    if (currentQuestion + 1 < questions.length) {
      //setCurrentQuestion(currentQuestion + 1);
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
      });
      return;
    }

    //setShowResults(true);
    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
    //setAnswers([]);
    //dispatch({ type: SET_ANSWERS, answers: [] });
    //setCurrentAnswer("");
    //dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: "" });
    //setCurrentQuestion(0);
    //dispatch({ type: SET_CURRENT_QUESTION, currentQuestion: 0 });
    //setShowResults(false);
    //dispatch({ type: SET_SHOW_RESULT, showResults: false });
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
          //handleClick={handleClick}
          dispatch={dispatch}
        />
        <button className="btn btn-primary" onClick={next}>
          Confirm and contineue
        </button>
      </div>
    );
  }
}

export default App;
