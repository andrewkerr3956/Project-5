import { useState, useEffect } from "react";
import Link from 'next/link';

// View a user's profile, displaying their points and questions they've asked.
const Profile = (props) => {
    const [profileName, setProfileName] = useState("");
    const [profilePoints, setProfilePoints] = useState(0);
    const [profileQuestions, setProfileQuestions] = useState([]);
    const [profileSuccess, setProfileSuccess] = useState(true);

    useEffect(() => { // Fetch the user's profile when the page is loaded.
        const fetchProfile = async () => { 
            let getId = new URLSearchParams(window.location.search);
            getId = getId.get("id");
            let data = await fetch(`/api/profile?id=${getId}`);
            data = await data.json();
            if (data.error) {
                setProfileSuccess(false);
            }
            else {
                setProfileName(data.results[0].username);
                setProfilePoints(data.results[0].points);
            }
        }
        fetchProfile();
    }, []);

    useEffect(() => { // Fetch the user's asked questions when the page is loaded.
        const fetchQuestions = async() => {
            let getId = new URLSearchParams(window.location.search);
            getId = getId.get("id");
            let data =  await fetch(`/api/profile?qid=${getId}`);
            data = await data.json();
            if (data.error) {
                setProfileSuccess(false);
            }
            else if (data.noResults) {
                setProfileQuestions(["No questions asked."]);
            }
            else {
                setProfileQuestions(data.results);
            }
        }
        fetchQuestions();
    }, []);

    return (
        <div>
            {profileSuccess && (
                <>
                    <h2>{profileName}&apos;s Profile</h2>
                    <h4>{profilePoints} points earned</h4>
                    <h3>Questions Asked</h3>
                    <section name="questionsSection">
                        <ul style={{listStyleType: 'none'}}>
                        {profileQuestions.map((item) => {
                            if (item.question) { // Check if there are any actual questions in the questions list
                                return <li key={item.questionid} style={{color: 'blue', marginTop: '10px'}}><Link href={`/question?qid=${item.questionid}`} passHref>{item.question}</Link><div style={{color: 'black'}}>asked <strong>{item.askdate}</strong></div></li>
                            }
                            else {
                                return <li>This user has not asked any questions.</li>
                            }
                        })}
                        </ul>
                    </section>
                </>
            )}
            {!profileSuccess && (
                <div>The profile does not exist.</div>
            )}
        </div>
    )

}

export default Profile;