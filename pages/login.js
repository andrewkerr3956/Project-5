import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const CheckLogin = async (user, pass) => {
    event.preventDefault();
    document.getElementById('loginError').innerText = "";
    console.log("Check Login called!")
    let data = await fetch(`/api/login`, {
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
    if (data.error || data.methodError) {
        document.getElementById('loginError').innerText = "Error logging in. Please try again."
    }
    else {
        sessionStorage.setItem("userid", data.results[0].userid);
        sessionStorage.setItem("username", data.results[0].username);
        sessionStorage.setItem("points", data.results[0].points);
        window.location.pathname = '/';
    }
}

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
                        <button type="submit">Submit</button> <p />
                        <div id="loginError" style={{ color: "red" }}></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;