import React from "react";
import { nanoid } from "nanoid";
import Questions from "./Questions";

export default function Quiz(props) {

  const [data, setData] = React.useState([]);
  const [isClicked, setIsClicked] = React.useState(false);
  const [checkResults, setCheckResults] = React.useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = React.useState(0);
  const [gameReset, setgameReset] = React.useState(false);

  function decodeHtml(data) {
    const txt = document.createElement("textarea");
    txt.innerHTML = data;
    return txt.value;
  }

  function optionClicked(id) {
    setData((prevData) => {
      return prevData.map((data) => {
        if (data.answers.some((mov) => mov.id === id)) {
          const newAnswers = data.answers.map((arr) => {
            if (arr.id === id) {
              return { ...arr, isClicked: !arr.isClicked };
            } else {
              return { ...arr, isClicked: false };
            }
          });
          return { ...data, answers: newAnswers };
        } else {
          return { ...data };
        }
      });
    });
  }

  function checkAnswers() {
    let count = 0;
    data.map((mov) => {
      mov.answers.forEach(arr => {
        if(arr.isClicked && arr.isCorrect) {
          setCorrectAnswerCount(prevState => prevState + 1)
        }
      });
      if(mov.answers.every(arr => !arr.isClicked))
        {
          count++;
      }
    });
    setCheckResults(prevState => count === 0 ? !prevState : prevState);
  }

  function resetGame() {
    setCheckResults(prevState => !prevState)
    setCorrectAnswerCount(prevState => !prevState)
    setgameReset(prevState => !prevState)
  }

  React.useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${props.apiData.questions}&category=${props.apiData.category}&difficulty=${props.apiData.difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((dataResponse) => {
        setData(
          dataResponse.results.map((arr, index) => {
            const incorrectAns = arr.incorrect_answers.map((ans) =>
              decodeHtml(ans)
            );
            const correctAns = decodeHtml(arr.correct_answer);
            const answerArr = [...incorrectAns, correctAns]
              .sort()
              .map((arr) => ({
                answer: arr,
                id: nanoid(),
                isClicked: isClicked,
                isCorrect: arr === correctAns ? true : false,
              }));

            return {
              key: index + 1,
              question: decodeHtml(arr.question),
              answers: answerArr,
              correct_answer: decodeHtml(arr.correct_answer),
            };
          })
        );
      });
  }, [gameReset]);

  const question = data.map((arr) => {
    return (
      <Questions
        key={arr.key}
        question={arr.question}
        answers={arr.answers}
        correct_answer={arr.correct_answer}
        optionSelected={optionClicked}
        checkResults={checkResults}
      />
    );
  });

  return (
    <React.Fragment>
        <div className="main-container">
          {question}
          <div className="result-container">
            {!checkResults  
            ? <button className="btn-answer" onClick={checkAnswers}>Check Answers</button> 
            : <button className="btn-answer" onClick={resetGame}>Play Again</button>}
            {checkResults && <span className="result-msg">You scored {correctAnswerCount === false ? 0 : correctAnswerCount} / 5 correct answers</span> }
            {!checkResults && <span className="result-msg">Please check all the answers before proceeding</span>}
          </div>
        </div>
    </React.Fragment>
  );
}