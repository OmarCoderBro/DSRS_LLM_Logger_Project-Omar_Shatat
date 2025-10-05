import React, { useState } from "react";
import "../styles/test.css";

function PromptForm({ addLog }) {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [response, setResponse] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = performance.now();

    try {
      const res = await fetch("http://localhost:4000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, prompt }),
      });

      const data = await res.json();
      const responseText = data.response || "No response received";
      setResponse(responseText);

      const latency_ms = Math.round(performance.now() - start);
      const created_at = new Date().toISOString();

      const prompt_length = prompt.length;
      const response_length = responseText.length;

      const hallucRes = await fetch("http://localhost:3001/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, response: responseText }),
      });

      const hallucData = await hallucRes.json();
      setResult(hallucData);

      const logPayload = {
        model,
        prompt,
        response: responseText,
        latency_ms,
        created_at,
        hallucination_score: hallucData.score || null,
        prompt_length,
        response_length,
      };

      /*
      await fetch("http://localhost:4000/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logPayload),
      });
      */
      
      addLog(logPayload);
      setPrompt("");

    } catch (err) {
      console.error("Error contacting backend:", err);
      setResponse("Error contacting backend.");
    }
  };



  return (
    <div className="prompt-container">
      <h2 className = "main-header">🌐 Send an LLM your prompt, recieve a response 🌐</h2>
      <p className = "main-paragraph">Start your LLM tracking right now. Every question we answer with various Gemini models will appear in your Logs tab.  </p>

      <form onSubmit={handleSubmit} className="prompt-form">
        <input
          type="text"
          placeholder="Enter your query..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="prompt-input"
        />
        <p className = "selectmodelp">Select your model.</p>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="prompt-dropdown"
        >
        <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
        <option value="gemini-2.0-pro">Gemini 2.0 Pro</option>
        <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
        <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
        </select>

        <button type="submit" className="prompt-button">
          Submit Query
        </button>
      </form>

      <div className="response-box">
        <h3>Gemini's Response:</h3>
        <textarea
          readOnly
          value={response}
          placeholder="Model output will appear here..."
        />
      </div>
    </div>
  );
}


export default PromptForm;