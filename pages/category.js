import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function Category(props) {
    const [questionText, setQuestionText] = useState(""); // The question text value in the create question section of a category
    const [detailsText, setDetailsText] = useState(""); // The details text value in the create question section of a category
    const [questionsList, setQuestionsList] = useState([]); // The questions list will hold the questions obtained from the chosen categories
    // When the page is loaded, determine if their is a user logged in. If not, display that they must login to create questions.
    useEffect(() => {
        if (!sessionStorage.getItem("userid")) {
            setQuestionText("Login to create a question.")
            setDetailsText("You must be logged in to create a question.")
        }
    }, []);

    const handleQuestionText = async (event) => {
        setQuestionText(event.target.value);
    }

    const handleDetailsText = async (event) => {
        setDetailsText(event.target.value);
    }

    const submitQuestion = async () => {
        // Handles submitting a question.
        let data = await fetch(`/api/question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: questionText,
                questionDetails: detailsText,
                userid: sessionStorage.userid,
                categoryid: currentCategory
            })
        });
        data = await data.json();
        if (data.success) {
            alert("Question has been successfully created!");
        }
    }
    return (
        <>
            <h2>Welcome to {props.categoryTitle}</h2> <p />
            <section name={"createQuestion"}>
                <h3>Create a Question</h3>
                <label htmlFor={"question"}> Question <br />
                    <input type="text" value={questionText} onChange={handleQuestionText} maxLength={200} readOnly={!props.userActive} required />
                </label> <p />
                <label htmlFor={"details"}> Details <br />
                    <textarea value={detailsText} onChange={handleDetailsText} rows={4} cols={24} maxLength={200} readOnly={!props.userActive} required />
                </label> <p />
                {props.userActive && (
                    <button type="submit" onClick={submitQuestion}>Submit</button>
                )}
            </section>
            <section style={{ marginTop: "40px" }} name={"previousQuestions"}>
                <h3>Previous Questions</h3>
                <ul style={{ listStyleType: 'none' }}>
                    {questionsList.length > 0 && questionsList.map((item, idx) => {
                        if (item.questionid && item.question && item.author) {
                            // Check if we actually have questions in the array.
                            return <li key={idx}><Link href={`/question?qid=${item.questionid}`} passHref>{item.question}</Link><div>by <strong>{item.author}</strong></div></li>
                        }
                        else {
                            // No results from the database
                            return <li key={idx}>{item}</li>
                        }
                    })}
                </ul>
            </section>
        </>
    )
}