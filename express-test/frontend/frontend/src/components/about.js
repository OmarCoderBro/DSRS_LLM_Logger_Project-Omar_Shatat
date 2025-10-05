import React from "react"
import "../styles/about.css"

const AboutPage = () => {
    return (
        <div className = "body">
            <p className = "introheader">hello, welcome to EchoLog   👋</p>
            <p className = "introp2">Use this web app to monitor LLM calls, and derive insights on certain models</p>
            <ul className="list">
                <li className="le">Analze hallucination scores of a specific Gemini model 🤖</li>
                <li className="le">Analyze the response lengths for specific model responses 📈</li>
                <li className="le">Look at data visualizations that analyze LLM calls over time 📊</li>
                <li className="le">Store LLM calls in a PostgreSQL database 🌐</li>
                <li className="le">Filter LLM logs by date or model used 🔍</li>
            </ul>
        </div>
    )
};

export default AboutPage;