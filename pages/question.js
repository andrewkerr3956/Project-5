import { useState, useEffect } from 'react';

const Question = (props) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [question, setQuestion] = useState("");
    const [questionDetails, setQuestionDetails] = useState("");
    const [author, setAuthor] = useState("");
    const [askDate, setAskDate] = useState(undefined);
    const [answerText, setAnswerText] = useState("");
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        // Obtain the query parameters from the url.
        let questionid = new URLSearchParams(window.location.search);
        questionid = questionid.get('qid');
        // Fetch the data from the api with the given url
        const fetchQuestionData = async () => {
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
                    return tempArray.push({ answerid: item.answerid, answer: item.answer, author: item.author, answerdate: item.answerdate });
                });
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
            let questionid = new URLSearchParams(window.location.search);
            questionid = questionid.get('qid');
            // If the answer is at least 15 characters long.
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

    const handleAnswerText = async (event) => {
        setAnswerText(event.target.value);
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
                    </section> <p />
                    <section name="answerSection">
                        <div style={{ fontSize: '1.4rem' }}><strong>Answers</strong></div> <p />
                        <textarea rows={4} cols={24} value={answerText} onChange={handleAnswerText} readOnly={!props.userActive} required /> <br />
                        {props.userActive && (
                            <button type="submit" onClick={submitAnswer}>Submit Answer</button>
                        )} <p />
                        <ul style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', listStyleType: 'none' }}>
                            {answers.length > 0 && answers.map((item, idx) => {
                                if (item.answerid && item.answer && item.author) { // Check if the answer actually exists.
                                    return (
                                        <li key={item.answerid} style={{ marginTop: '2%', width: '80%', border: '2px solid black', borderRadius: '2px', backgroundColor: 'lightblue' }}>
                                            <div>{item.answer}</div>
                                            <div>answered by <strong>{item.author}</strong> on <strong>{item.answerdate}</strong></div>
                                        </li>
                                    )
                                }
                                else {
                                    return <li key={idx}>{item}</li>
                                }
                            })}
                        </ul>
                    </section>
                </div>
            )}
        </div>
    )
}

export default Question;