import { useState, useEffect } from "react";

// View a user's profile, displaying their points and questions they've asked.
const Profile = (props) => {
    const [profileName, setProfileName] = useState("");
    const [profilePoints, setProfilePoints] = useState(0);
    const [profileQuestions, setProfileQuestions] = useState([]);
    const [profileSuccess, setProfileSuccess] = useState(true);

    useEffect(() => {
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

    useEffect(() => {

    }, []);

    return (
        <div>
            {profileSuccess && (
                <>
                    <h2>{profileName}&apos;s Profile</h2>
                    <h4>{profilePoints} points earned</h4>
                    <h3>Questions Asked</h3>
                    <section name="questionsSection">
                        {/* Map the questions list */}
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