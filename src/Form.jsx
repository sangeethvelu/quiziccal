import React from "react";
import ReactDOM from "react-dom";

export default function Form(props) {

    function Backdrop(props) {
        return <div className="backdrop" onClick={props.handleShowForm}>{props.children}</div>
    }
    
    function ModalOverlay(props) {

        const [formData, setFormData] = React.useState({
            questions: 5,
            category: "",
            difficulty: "easy"
        })
    
        function changeFormData(event) {
            const {name, value} = event.target;
            setFormData(prevData => {
                return {
                    ...prevData,
                    [name]: name === "questions" ? Number(value) : value
                }
            })
        }
    
        function handleSubmit(event) {
            event.preventDefault();
            props.handleData(formData);
            props.handleShowForm();
        }

        return (
            <React.Fragment>
                {props.showForm &&
                    <form className="form-container" onSubmit={handleSubmit}>
                        <label htmlFor="questions" className="label-header">Number of Questions</label>
                        <input
                            type="number"
                            min="5"
                            max="25"
                            id="questions"
                            name="questions"
                            value={formData.questions}
                            onChange={changeFormData}
                            className="input-header"
                        />
                        <label htmlFor="category" className="label-header">Select Category</label>
                        <select 
                            name="category"
                            id="category"
                            value={formData.category}
                            onChange={changeFormData}
                            className="select-header"
                        >
                            <option value="">Any Category</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals & Theaters</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Entertainment: Video Games</option>
                            <option value="16">Entertainment: Board Games</option>
                            <option value="17">Science & Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Art</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                        </select>
                        <label htmlFor="difficulty" className="label-header">Select Difficulty</label>
                        <select
                            name="difficulty"
                            id="difficulty"
                            value={formData.difficulty}
                            onChange={changeFormData}
                            className="select-header"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                        <button onClick={handleSubmit}>Submit</button>
                    </form>
                }
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop handleShowForm={props.handleShowForm}/>,
                document.getElementById("backdrop-root"))
            }
            {ReactDOM.createPortal(
                <ModalOverlay handleData={props.handleData} showForm={props.showForm} handleShowForm={props.handleShowForm}/>,
                document.getElementById("overlay-root"))
            }
        </React.Fragment>
    )
}