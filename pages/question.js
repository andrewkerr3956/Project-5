import { useState, useEffect } from 'react';

const Question = (props) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [question, setQuestion] = useState("");
    const [questionDetails, setQuestionDetails] = useState("");
    const [author, setAuthor] = useState("");
    const [askDate, setAskDate] = useState(undefined);
    useEffect(() => {
        // Obtain the query parameters from the url.
        let questionid = new URLSearchParams(window.location.search);
        questionid = questionid.get('qid');
        // Fetch the data from the api with the given url
        const fetchData = async () => {
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
        fetchData();
    }, [])
    return (
        <div className={'questionContainer'}>
            {error && (
                <div>Error.</div>
            )}
            {success && (
                <div style={{ textAlign: 'left' }}>
                    <section name="questionSection">
                        <div style={{ fontSize: '1.2rem' }}><strong>{question}</strong></div>
                        <div>{questionDetails}</div>
                        <div>Asked by: <strong>{author}</strong> on <strong>{askDate}</strong></div>
                    </section> <p />
                    <section name="answerSection">
                        <div style={{fontSize: '1.4rem'}}><strong>Answers</strong></div>
                        {/* Map answers here */}
                    </section>
                </div>
            )}
        </div>
    )
}

export default Question;