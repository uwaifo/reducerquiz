import React from "react";
import { SET_CURRENT_ANSWER, SET_ERROR } from "../Reducers/Types";
function Answer(props) {
  let classes = ["answer"];

  const handleClick = (e) => {
    //setCurrentAnswer(e.target.value);
    props.dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: e.target.value });
    //setError("");
    props.dispatch({ type: SET_ERROR, error: "" });
  };

  if (props.selected) {
    classes.push("selected");
  }

  return (
    <button
      className={classes.join(" ")}
      value={props.letter}
      //onClick={props.handleClick}
      onClick={handleClick}
    >
      <span className="letter">{props.letter} : </span>
      {props.answer}
    </button>
  );
}

export default Answer;
