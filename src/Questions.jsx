import React from "react";
import Answers from "./Answers";

export default function Questions(props) {
  const options = props.answers.map((arr, index) => {
    return (
      <Answers
        key={index}
        options={arr.answer}
        id={arr.id}
        isClicked={arr.isClicked}
        optionSelected={props.optionSelected}
        checkResults={props.checkResults}
        isCorrect={arr.isCorrect}
      />
    );
  });

  return (
    <div className="hero-container">
      <p className="quiz-question">{props.question}</p>
      {options}
    </div>
  );
}
