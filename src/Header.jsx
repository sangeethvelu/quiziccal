import React from "react";
import Form from "./Form";

export default function Header(props) {

    return (
        <div className="header">
            {props.showForm &&
                <Form handleData={props.handleData} showForm={props.showForm} handleShowForm={props.handleShowForm}/>
            }
            <header className="header-container">
                <h1 className="header-title">Quizzical</h1>
                <p className="header-description">A quiz game with some interesting trivia to learn</p>
                <button className="btn-header" onClick={props.quizStart}>Start Quiz</button>
            </header>
        </div>
    )
}
