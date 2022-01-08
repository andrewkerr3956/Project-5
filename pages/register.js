import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const AddUser = async (user, pass, repeatPass) => {
    event.preventDefault();
    if (repeatPass === pass) { // Only register the user if the two fields match.
        document.getElementById('registerError').innerText = "";
        console.log("Add user called!")
        let data = await fetch(`/api/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        });
        data = await data.json();
        if (data.error || data.methodError || data.existsError) {
            if (data.error)
                document.getElementById('registerError').innerText = data.error;
            else if (data.methodError)
                document.getElementById('registerError').innerText = data.methodError;
            else
                document.getElementById('registerError').innerText = data.existsError;
        }
        else {
            window.location.pathname = '/';
        }
    }
    else {
        document.getElementById('registerError').innerText = "The two passwords must match."
    }
}

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    useEffect(() => {
        if (sessionStorage.userid) {
            window.location.pathname = '/';
        }
    }, []);
    return (
        <div>
            <div style={{ position: "absolute", top: "0", height: "125vh", width: "100%", background: "linear-gradient(180deg, rgba(172, 116, 216, 0) 0%, #AC74D8 10.42%, rgba(172, 116, 216, 0.916667) 99.97%, rgba(172, 116, 216, 0) 99.98%, rgba(172, 116, 216, 0.0238739) 99.99%)" }}>
                <h2 style={{ marginTop: "10%", textAlign: "center" }}>Answers Galore</h2>
                <div style={{ backgroundColor: "whitesmoke", width: "50%", border: "2px solid black", textAlign: "center", margin: "auto", padding: "1rem" }}>
                    <h4>Register an account</h4>
                    <form id="loginForm" onSubmit={() => AddUser(username, password, repeatPassword)}>
                        <label htmlFor="username">Username <br />
                            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} maxLength={50} required />
                        </label> <p />
                        <label htmlFor="password">Password <br />
                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required maxLength={200} />
                        </label> <p />
                        <label htmlFor="repeatPassword">Repeat Password <br />
                            <input type="password" value={repeatPassword} onChange={(event) => setRepeatPassword(event.target.value)} required maxLength={200} />
                            {repeatPassword !== "" && repeatPassword !== password && (
                                <div style={{ color: "red", fontSize: "0.7rem" }}>The passwords do not match.</div>
                            )}
                        </label> <p />
                        <em><Link href={'/login'} passHref>Already have an account?</Link></em> <br />
                        <button type="submit">Submit</button> <p />
                        <div id="registerError" style={{ color: "red" }}></div>
                    </form>
                </div>
            </div>
        </div>
    )
}