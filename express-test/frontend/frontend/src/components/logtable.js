import React, {useState} from "react";
import "../styles/logtable.css";


const LLMLogsTable = ({logs = [], setLogs}) => {
  const [selectedModel, setSelectedModel] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("all");


  const handleClearLogs = async () => {
    if (!window.confirm("Are you sure you want to clear all logs?")) return;
    try {
      /*
      await fetch("http://localhost:4000/api/clear-logs", {
        method: "DELETE",
      });
      */
      setLogs([]); // instantly clear on frontend
    } catch (err) {
      console.error("Failed to clear logs:", err);
    }
  };
  
  const models = [
  "gemini-2.0-flash",
  "gemini-2.0-pro",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
];

  let filteredLogs =
    selectedModel === "all"
      ? logs
      : logs.filter((log) => log.model === selectedModel);

  
  if (selectedDateRange !== "all") {
    const now = new Date();
    filteredLogs = filteredLogs.filter((log) => {
      const createdDate = new Date(log.created_at);
      const diffMs = now - createdDate; // difference in milliseconds
      const diffDays = diffMs / (1000 * 60 * 60 * 24); // convert to days
      if (selectedDateRange === "day") return diffDays <= 1;
      if (selectedDateRange === "month") return diffDays <= 30;
      if (selectedDateRange === "year") return diffDays <= 365;
      return true;
    });
  }

  return (
    <div>
      <h2 className="title">Your Personal LLM Log Made Simple</h2>
      <p className="introp">
        Below is each LLM call you made. We tracked values for you like the lengths of the prompt and
        response, the model of the LLM, the hallucination score, latency, and more. You have the option to clear the log,
        or filter the log by date or model used.
      </p>

      {/* Filter dropdown */}
      <div className="flex items-center gap-4 mb-4">
        
        <label htmlFor="modelFilter" className = "filterlabel">Filter by model:</label>
        <select
          id="modelFilter"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="filter-btn">
          <option value="all">All Models</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <label htmlFor="dateFilter" className = "filterlabel">Filter by date:</label>
        <select
          id="dateFilter"
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
          className="filter-btn"
        >
          <option value="all">All Time</option>
          <option value="day">Last Day</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>

        <button onClick={handleClearLogs} className="clear-btn">
          Clear Logs
        </button>
      </div>

      <div className="llm-logs-container mt-4">
        <table className="llm-logs-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Prompt</th>
              <th>Response</th>
              <th>Latency (ms)</th>
              <th>Hallucination Score</th>
              <th>Prompt Length</th>
              <th>Response Length</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="8" className="llm-no-logs">
                  No logs for selected model.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.model}</td>
                  <td>{log.prompt}</td>
                  <td>{log.response}</td>
                  <td>{log.latency_ms}</td>
                  <td>{log.hallucination_score}</td>
                  <td>{log.prompt_length}</td>
                  <td>{log.response_length}</td>
                  <td>{log.created_at}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LLMLogsTable;