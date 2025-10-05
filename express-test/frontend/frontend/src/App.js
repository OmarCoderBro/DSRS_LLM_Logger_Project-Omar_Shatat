import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import PromptForm from "./components/test";
import LLMLogsTable from "./components/logtable";
import Visualizations from "./components/visualizations";
import AboutPage from "./components/about";

function App() {
  const [logs, setLogs] = useState([]);
  
    const addLog = (newLog) => {
      setLogs((prevLogs) => {
        const updatedLogs = [newLog, ...prevLogs];
        return updatedLogs.slice(0, 50);
      });
    };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/test" />} />
            <Route path="/test" element={<PromptForm addLog={addLog} />} />
            <Route path="/logs" element={<LLMLogsTable logs={logs} setLogs={setLogs} />} />
            <Route path="/visualizations" element={<Visualizations logs={logs} />} />
            <Route path="/about" element={<AboutPage logs={logs} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
