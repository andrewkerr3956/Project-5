import { useState, useEffect } from 'react'
import Link from 'next/link'
export default function Category(props) {
    const [questionText, setQuestionText] = useState(""); // The question text value in the create question section of a category
    const [detailsText, setDetailsText] = useState(""); // The details text value in the create question section of a category
    const [questionsList, setQuestionsList] = useState([]); // The questions list will hold the questions obtained from the chosen categories
    // When the page is loaded, determine if their is a user logged in. If not, display that they must login to create questions.
    useEffect(() => {
        // Handles if user is not logged in
        if (!sessionStorage.getItem("userid")) {
            setQuestionText("Login to create a question.")
            setDetailsText("You must be logged in to create a question.")
        }
    }, []);
    useEffect(() => {
        // Handles if the user refreshes the page to match the current selected category and fetch the questions for them
        const fetchCategoryTitle = async () => {
            let searchParams = new URLSearchParams(window.location.search)
            if (searchParams.has('id')) { // Check if the url contains an categoryid
                props.setCurrentCategory(searchParams.get('id'));
                let data = await fetch(`/api/category?id=${searchParams.get('id')}`);
                data = await data.json();
                props.setCategoryTitle(data.results[0].category);

            }
        }
        fetchCategoryTitle();
    }, []);
    useEffect(() => {
        fetchQuestions();
    }, [props.currentCategory]);

    const fetchQuestions = async () => {
        let data = await fetch(`/api/question?categoryid=${props.currentCategory}`);
        data = await data.json();
        if (data.results) {
            // Handle if there are results
            let tempArray = [];
            data.results.map((item) => {
                return tempArray.push({ questionid: item.questionid, question: item.question, author: item.author, askdate: item.askdate, authorid: item.authorid, correct: item.correct });
            })
            tempArray.reverse()
            setQuestionsList(tempArray);
        }
        else {
            // Handle no results
            let tempArray = [];
            tempArray.push("There are currently no questions.");
            setQuestionsList(tempArray);
        }
    }

    const handleQuestionText = async (event) => {
        setQuestionText(event.target.value);
    }

    const handleDetailsText = async (event) => {
        setDetailsText(event.target.value);
    }

    const submitQuestion = async () => {
        // Handles submitting a question.
        if (questionText.length >= 15 && questionText.length <= 200 && detailsText.length <= 500) {
            /* Only add the question to the database if it's at least 15 characters long. The other 2 conditions are to make sure it doesn't exceed
            the database's set maximum lengths. */
            let data = await fetch(`/api/question`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: questionText,
                    questionDetails: detailsText,
                    userid: sessionStorage.userid,
                    categoryid: props.currentCategory
                })
            });
            data = await data.json();
            if (data.success) {
                alert("Question has been successfully created!");
            }
            window.location.reload();
        }
        else {
            alert("The question must be between 15 and 200 characters long. The additional details can have a maximum of 500 characters.");
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
                    <textarea value={detailsText} onChange={handleDetailsText} rows={4} cols={24} maxLength={200} readOnly={!props.userActive} />
                </label> <p />
                {props.userActive && (
                    <button type="submit" style={{backgroundColor: 'green'}} onClick={submitQuestion}>Submit</button>
                )}
            </section>
            <section style={{ marginTop: "40px" }} name={"previousQuestions"}>
                <h3>Previous Questions</h3>
                <ul style={{ listStyleType: 'none' }}>
                    {questionsList.length > 0 && questionsList.map((item, idx) => {
                        if (item.questionid && item.question && item.author) {
                            // Check if we actually have questions in the array.
                            if (item.correct != null) {
                                return (
                                    <div>
                                        <li key={idx} style={{ color: 'blue' }}>
                                        <span title={"This question has been answered"} style={{ color: 'darkgreen', fontSize: '2rem', fontWeight: '600'}}>✓</span>
                                            <Link href={`/question?qid=${item.questionid}`} passHref>{item.question}</Link>
                                            <div style={{ color: 'black' }}>asked by <strong> <Link href={`/profile?id=${item.authorid}`} passHref>{item.author}</Link></strong> on <strong>{item.askdate}</strong></div></li>
                                    </div>
                                )
                            }
                            else {
                                return (
                                    <li key={idx} style={{ color: 'blue' }}>
                                        <Link href={`/question?qid=${item.questionid}`} passHref>{item.question}</Link>
                                        <div style={{ color: 'black' }}>asked by <strong><Link href={`/profile?id=${item.authorid}`} passHref>{item.author}</Link></strong> on <strong>{item.askdate}</strong></div>
                                    </li>
                                )
                            }
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