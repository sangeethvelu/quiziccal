import React from "react";

export default function Answers(props) {

  let checkedAnswercolor = "";
    if (props.isCorrect) {
      checkedAnswercolor = "#42C95F";
    } else if (props.isClicked && !props.isCorrect) {
      checkedAnswercolor = "#F03B3B";
    }

  const styles = {
    backgroundColor: props.isClicked ? "#8BCBF4" : "#F5F7FB",
    color: "rgb(20, 20, 20)",
    border: props.isClicked ? "1px solid #8BCBF4" : "1px solid black",
  };

  const checkAnswerstyles = {
    backgroundColor: checkedAnswercolor,
    color: "rgb(20, 20, 20)"
  }

  return (
    <div style={props.checkResults ? checkAnswerstyles : styles}
      className="quiz-answer"
      onClick={() => props.optionSelected(props.id)}
    >
      {props.options}
    </div>
  );
}
