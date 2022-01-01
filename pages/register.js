import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const AddUser = async (user, pass) => {
    event.preventDefault();
    document.getElementById('registerError').innerText = "";
    console.log("Check Login called!")
    let data = await fetch(`/api/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user,
            pass: pass
        })
    });
    data = await data.json();
    if (data.error || data.methodError) {
        document.getElementById('loginError').innerText = "Error logging in. Please try again."
    }
    else {
        sessionStorage.setItem("userid", 1);
        window.location.pathname = '/';
    }
}

const Register = () => {
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
                    <h4>Log in to your account</h4>
                    <form id="loginForm" onSubmit={() => CheckLogin(username, password)}>
                        <label htmlFor="username">Username <br />
                            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} maxLength={50} required />
                        </label> <p />
                        <label htmlFor="password">Password <br />
                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required maxLength={200} />
                        </label> <p />
                        <label htmlFor="repeatPassword">Repeat Password <br />
                            <input type="password" value={repeatPassword} onChange={(event) => setRepeatPassword(event.target.value)} required maxLength={200} />
                            {repeatPassword !== "" && repeatPassword !== password && (
                                <div style={{color: "red", fontSize: "0.7rem"}}>The passwords do not match.</div>
                            )}
                        </label> <p />
                        <button type="submit">Submit</button> <p />
                        <div id="loginError" style={{ color: "red" }}></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;