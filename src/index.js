import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState, useEffect } from 'react';

const App = () => {

    return (
        <div className="container">
            <header>
                <div className="header-container">
                    <h2>Answers Galore</h2>
                    <h5><em>"Your one stop destination for all the questions you need answered."</em></h5>
                </div>
                <div>
                    <nav>
                        <ul className="nav-container">
                            <li>Home</li>
                            <li>About</li>
                            <li>Forums</li>
                            <li>Support</li>
                        </ul>
                    </nav>
                </div>
            </header>

        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)