import { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div style={{position: "absolute", top: "0", height: "125vh", width: "100%", background: "linear-gradient(180deg, rgba(172, 116, 216, 0) 0%, #AC74D8 10.42%, rgba(172, 116, 216, 0.916667) 99.97%, rgba(172, 116, 216, 0) 99.98%, rgba(172, 116, 216, 0.0238739) 99.99%)"}}>
        <h2 style={{textAlign: "center"}}>Answers Galore</h2>
        <div style={{backgroundColor: "whitesmoke", width: "50%", border: "2px solid black", textAlign: "center", margin: " auto", padding: "1rem"}}>
            <form id="loginForm" action="submit">
            <label htmlFor="username">Username <br />
                <input type="text" value={username} onChange={() => setUsername} maxLength={50} required />
            </label> <p />
            <label htmlFor="password">Password <br />
                <input type="password" value={password} onChange={() => setPassword} required maxLength={200} />
            </label>
            <button>Submit</button>
            </form>
            </div>
      </div>
    )
}

export default Login;