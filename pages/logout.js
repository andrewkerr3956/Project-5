import { useEffect } from "react";
export default function Logout() {
    useEffect(() => { // Log the user out
        if (!sessionStorage.userid) {
            window.location.pathname = '/';
        }
        else {
            setTimeout(() => window.location.pathname = '/', sessionStorage.clear())
        }
    }, []);
    return (
        <div>
            <div style={{ position: "absolute", top: "0", height: "125vh", width: "100%", background: "linear-gradient(180deg, rgba(172, 116, 216, 0) 0%, #AC74D8 10.42%, rgba(172, 116, 216, 0.916667) 99.97%, rgba(172, 116, 216, 0) 99.98%, rgba(172, 116, 216, 0.0238739) 99.99%)" }}>
                <h2 style={{ marginTop: "10%", textAlign: "center" }}>Answers Galore</h2>
                <div style={{ backgroundColor: "whitesmoke", width: "50%", border: "2px solid black", textAlign: "center", margin: "auto", padding: "1rem" }}>
                    <h4>Logging you out of your account...</h4>
                    <p>You will be redirected in a few seconds.</p>
                </div>
            </div>
        </div>
    )
}
