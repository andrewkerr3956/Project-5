import { useState, useEffect } from 'react';
import Link from 'next/link';

const Question = (props) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [question, setQuestion] = useState("");
    const [questionDetails, setQuestionDetails] = useState("");
    const [author, setAuthor] = useState("");
    const [askDate, setAskDate] = useState(undefined);
    const [answerText, setAnswerText] = useState("");
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [editAnswerActive, setEditAnswerActive] = useState(false);
    const [editAnswerText, setEditAnswerText] = useState("");
    const [editAnswerId, setEditAnswerId] = useState(null);
    const [editQuestionActive, setEditQuestionActive] = useState(false);
    const [editQuestionText, setEditQuestionText] = useState("");

    useEffect(() => {
        // Fetch the data from the api with the given url
        const fetchQuestionData = async () => {
            // Obtain the query parameters from the url.
            let questionid = new URLSearchParams(window.location.search);
            questionid = questionid.get('qid');
            let data = await fetch(`/api/question?qid=${questionid}`);
            data = await data.json();
            if (data.error) {
                setError(true);
            }
            else {
                setSuccess(true);
                props.setCurrentCategory(data.results[0].categoryid);
                setQuestion(data.results[0].question);
                setQuestionDetails(data.results[0].questiondetails);
                setAuthor(data.results[0].author);
                setAskDate(data.results[0].askdate);
                setCorrectAnswer(data.results[0].correctid);
            }
        }
        fetchQuestionData();
    }, []);
    useEffect(() => {
        const fetchAnswersData = async () => {
            // Obtain the query parameters from the url.
            let questionid = new URLSearchParams(window.location.search);
            questionid = questionid.get('qid');
            let data = await fetch(`/api/answer?qid=${questionid}`);
            data = await data.json();
            if (data.results) {
                // Handle Results
                let tempArray = [];
                data.results.map((item, idx) => {
                    return tempArray.push({ answerid: item.answerid, answer: item.answer, author: item.author, answerdate: item.answerdate, editdate: item.editdate });
                });
                tempArray.map((item, idx) => {
                    if (item.answerid == correctAnswer) {
                        let correctIdx = item.answerid;
                        let tempItem = item // Hold the item so we can swap it's index position in the array
                        tempArray[correctIdx] = tempArray[0]; // Make the correct answer the first one in the list.
                        tempArray[0] = tempItem;

                    }
                })
                tempArray.reverse();
                setAnswers(tempArray);
            }
            else {
                // Handle no results
                let tempArray = [];
                tempArray.push("There are currently no answers.");
                setAnswers(tempArray);
            }
        }
        fetchAnswersData();
    }, []);
    // When the page is loaded, determine if their is a user logged in. If not, display that they must login to answer the question.
    useEffect(() => {
        // Handles if user is not logged in
        if (!sessionStorage.getItem("userid")) {
            setAnswerText("Login to answer the question.")
        }
    }, []);

    const submitAnswer = async () => {
        if (answerText.length >= 15 && answerText.length <= 500) {
            // If the answer is at least 15 characters long.
            // Obtain the query parameters from the url.
            let questionid = new URLSearchParams(window.location.search);
            questionid = questionid.get('qid');
            let data = await fetch('/api/answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionid: questionid,
                    answer: answerText,
                    authorid: sessionStorage.userid
                })
            })
            data = await data.json();
            if (data.error) {
                alert(data.error);
            }
            else {
                alert(data.success);
                window.location.reload();
            }
        }
        else {
            alert("Answers must be between 15 and 500 characters long.");
        }

    }

    const markCorrect = async (event) => {
        // Obtain the query parameters from the url.
        let questionid = new URLSearchParams(window.location.search);
        questionid = questionid.get('qid');
        let data = await fetch('/api/question', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionid: questionid,
                correct: event.target.id,
                userid: sessionStorage.getItem("userid")
            })
        })
        data = await data.json();
        if (data.error) {
            alert(data.error);
        }
        else {
            alert(data.success);
            window.location.reload();
        }
    }

    const deleteQuestion = async (event) => {
        // Obtain the query parameters from the url.
        let questionid = new URLSearchParams(window.location.search);
        questionid = questionid.get('qid');
        let data = await fetch('/api/question', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionid: questionid
            })
        })
        data = await data.json();
        if (data.error) {
            alert(data.error);
        }
        else {
            alert(data.success);
            window.location.replace(`/category?id=${props.currentCategory}`);
        }
    }

    const deleteAnswer = async (event) => {
        let data = await fetch('/api/answer', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                answerid: event.target.id
            })
        })
        data = await data.json();
        if (data.error) {
            alert(data.error);
        }
        else {
            alert(data.success);
            window.location.reload();
        }
    }

    const updateQuestion = async (event) => {
        // Obtain the query parameters from the url.
        let questionid = new URLSearchParams(window.location.search);
        questionid = questionid.get('qid');
        if(editQuestionText != "" && editQuestionText != null && editQuestionText.length >= 15 && editQuestionText.length <= 200) {
            let data = await fetch('/api/question', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionid: questionid, question: editQuestionText
                })
            });
            data = await data.json();
            if(data.error) {
                alert(data.error);
            }
            else {
                alert(data.success);
                window.location.reload();
            }
        }
        else {
            alert("The question must be between 15 and 200 characters long.");
        }
    }

    const updateAnswer = async (event) => {
        console.log("id", event.target.id, ", answer: " + editAnswerText);
        if (editAnswerText != "" && editAnswerText != null && editAnswerText.length >= 15 && editAnswerText.length <= 500) {
            let data = await fetch('/api/answer', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answerid: editAnswerId, answer: editAnswerText
                })
            });
            data = await data.json();
            if (data.error) {
                alert(data.error);
            }
            else {
                alert(data.success);
                window.location.reload();
            }
        }
        else {
            alert("The answer must be between 15 and 500 characters long.");
        }
    }

    const editQuestion = async (event) => {
        setEditQuestionActive(true);
    }

    const editAnswer = async (event) => {
        setEditAnswerActive(true);
        setEditAnswerId(event.target.id);
    }

    const handleAnswerText = async (event) => {
        setAnswerText(event.target.value);
    }

    const handleEditQuestionText = async (event) => {
        setEditQuestionText(event.target.value);
    }

    const handleEditAnswerText = async (event) => {
        setEditAnswerText(event.target.value);
    }

    return (
        <div className={'questionContainer'}>
            {error && (
                <div>Error.</div>
            )}
            {success && (
                <div>
                    <section name="questionSection">
                        <div style={{ fontSize: '1.2rem' }}><strong>{question}</strong></div>
                        <div>{questionDetails}</div>
                        <div>Asked by: <strong>{author}</strong> on <strong>{askDate}</strong></div>
                        {sessionStorage.getItem("username") == author && (
                            <div>
                                <button onClick={editQuestion}>Edit Question</button>
                                <button onClick={deleteQuestion}>Delete Question</button>
                            </div>
                        )}
                    </section> <p />
                    <section name="answerSection">
                        {!editAnswerActive && !editQuestionActive && ( // Only display this if user is not editing an answer or question
                            <>
                                <div style={{ fontSize: '1.4rem' }}><strong>Answers</strong></div> <p />
                                <textarea rows={6} cols={30} value={answerText} onChange={handleAnswerText} readOnly={!props.userActive} required /> <br />
                                {props.userActive && (
                                    <button type="submit" onClick={submitAnswer}>Submit Answer</button>
                                )} <p />
                                <ul style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', listStyleType: 'none' }}>
                                    {answers.length > 0 && answers.map((item, idx) => {
                                        if (item.answerid && item.answer && item.author) { // Check if the answer actually exists.
                                            if (item.answerid == correctAnswer) { // if the answer is the correct answer
                                                return (
                                                    <li key={item.answerid} style={{ marginTop: '2%', width: '80%', border: '2px solid black', borderRadius: '2px', backgroundColor: 'lightgreen' }}>
                                                        <div><span title={"Marked as correct answer"} style={{ color: 'darkgreen', fontSize: '2rem', fontWeight: '600', float: 'left', marginLeft: '5px' }}>✓</span>{item.answer}</div>
                                                        {/* Show if the answer has been edited. */}
                                                        {item.editdate && (
                                                            <div>edited on <strong>{item.editdate}</strong></div>
                                                        )}
                                                        {item.answerdate && (
                                                            <div>answered by <strong>{item.author}</strong> on <strong>{item.answerdate}</strong></div>
                                                        )}
                                                        {/* Show a edit button for the answer if user is logged in as the answer author. */}
                                                        {sessionStorage.getItem("username") == item.author && (
                                                            <button id={item.answerid} onChange={editAnswer}>Edit</button>
                                                        )}
                                                        {/* Show a delete button for the answer if user is logged in as the answer author. */}
                                                        {sessionStorage.getItem("username") == item.author && (
                                                            <button id={item.answerid} onClick={deleteAnswer}>Delete</button>
                                                        )}
                                                    </li>
                                                )

                                            }
                                            else {
                                                return (
                                                    <li key={item.answerid} style={{ marginTop: '2%', width: '80%', border: '2px solid black', borderRadius: '2px', backgroundColor: 'lightblue' }}>
                                                        <div>{item.answer}</div>
                                                        {/* Show if the answer has been edited. */}
                                                        {item.editdate && (
                                                            <div>edited on <strong>{item.editdate}</strong></div>
                                                        )}
                                                        <div>answered by <strong>{item.author}</strong> on <strong>{item.answerdate}</strong></div>
                                                        {/* Show a edit button for the answer if user is logged in as the answer author. */}
                                                        {sessionStorage.getItem("username") == item.author && (
                                                            <button id={item.answerid} onClick={editAnswer}>Edit</button>
                                                        )}
                                                        {/* Show a delete button for the answer if user is logged in as the answer author. */}
                                                        {sessionStorage.getItem("username") == item.author && (
                                                            <button id={item.answerid} onClick={deleteAnswer}>Delete</button>
                                                        )}
                                                        {/* Check if the user logged in as the author of the question, and if there is no correct answer. */}
                                                        {sessionStorage.getItem("username") == author && correctAnswer == null && (
                                                            <button id={item.answerid} onClick={markCorrect}>Mark Correct</button>
                                                        )}
                                                    </li>
                                                )
                                            }
                                        }
                                        else {
                                            return <li key={idx}>{item}</li>
                                        }
                                    })}
                                </ul>
                            </>
                        )}
                        {editQuestionActive && (
                            <div>
                                <h2>Editing Question...</h2>
                                <textarea rows={8} cols={30} value={editQuestionText} onChange={handleEditQuestionText} /> <p />
                                <button onClick={() => window.location.reload()}>Cancel</button>
                                <button onClick={updateQuestion}>Update</button>
                            </div>
                        )}
                        {editAnswerActive && (
                            <div>
                                <h2>Editing Answer...</h2>
                                <textarea rows={8} cols={30} value={editAnswerText} onChange={handleEditAnswerText} /> <p />
                                <button onClick={() => window.location.reload()}>Cancel</button>
                                <button onClick={updateAnswer}>Update</button>
                            </div>
                        )}
                    </section>
                </div>
            )}
        </div>
    )
}

export default Question;