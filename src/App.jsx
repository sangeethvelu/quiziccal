import React from 'react';
import Header from "./Header";
import Quiz from "./Quiz";

export default function App() {

  const [apiData, setApiData] = React.useState({
    questions: 5,
    category: "",
    difficulty: ""
  });

  const [isStart, setIsStart] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  function handleApiData(data) {
    setApiData(data);
  }

  function quizStart() {
    setIsStart(prevState => !prevState);
  }

  function handleShowForm() {
    setShowForm(prevState => !prevState);
  }

  return (
    <div className="container">
      {!isStart && <div className="form-display-icon">
        <img className="header-icon" src="/public/icons/settings.svg" alt="Settings Icon" onClick={handleShowForm}/>
      </div>}
      {isStart ? <Quiz apiData={apiData}/> : <Header quizStart={quizStart} handleData={handleApiData} showForm={showForm} handleShowForm={handleShowForm}/>}
    </div>
  ) 
}



