import { useState, useEffect} from 'react';

const Question = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [question, setQuestion] = useState("");
    const [questionDetails, setQuestionDetails] = useState("");
    const [author, setAuthor] = useState("");
    useEffect(() => {
        // Obtain the query parameters from the url.
        let questionid = new URLSearchParams(window.location.search);
        questionid = questionid.get('qid');
        // Fetch the data from the api with the given url
        const fetchData = async() => {
            let data = await fetch(`/api/question?qid=${questionid}`);
            data = await data.json();
            if(data.error) {
                setError(true);
            }
            else {
                setSuccess(true);
                setQuestion(data.results[0].question);
                setQuestionDetails(data.results[0].questiondetails);
                setAuthor(data.results[0].author);
            }
        }
        fetchData();
    }, [])
    return (
        <div className={'questionContainer'}>
            The verdict is: <br />
            {error && (
                <div>Error.</div>
            )}
            {success && (
                <div>
                <div>Success!</div>  <p /> <p />
                <div>Data found: </div>
                <div>Question: {question}</div>
                <div>Details: {questionDetails}</div>
                <div>Author: {author}</div>
                </div>
            )}
        </div>
    )
}

export default Question;