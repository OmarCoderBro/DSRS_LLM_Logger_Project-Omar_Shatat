import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import '../styles/visualizations.css'

const Visualizations = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return <>
          <p className="titleheader">No logs to display. 😔</p>
          <p className="titleparagraph">Try making some LLM calls in the Test LLMs tab. The results will show up here.</p>;
          </>
  };

  // ✅ Transform logs into chart-friendly format
  const chartData = logs.map((log, index) => ({
    index,
    latency: Number(log.latency_ms),
    hallucination: Number(log.hallucination_score || log.hallucination || 0),
    promptLength: Number(log.prompt_length || 0),
    responseLength: Number(log.response_length || 0),
    model: log.model,
    time: new Date(log.created_at).toLocaleTimeString(),
  }));

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md space-y-12 text-center font-sans body">
      {/* ✅ Latency over time */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center graphheader">LLM Latency Over Time (in ms) </h2>
        <ResponsiveContainer width="90%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Hallucination score over time */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center graphheader">LLM Hallucination Score Over Time</h2>
        <ResponsiveContainer width="90%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="hallucination"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ Prompt vs. Response Length over time */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center graphheader">
          Prompt vs. Response Length Over Time
        </h2>
        <ResponsiveContainer width="90%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="promptLength"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              name="Prompt Length"
            />
            <Line
              type="monotone"
              dataKey="responseLength"
              stroke="#ff7300"
              strokeWidth={2}
              dot={false}
              name="Response Length"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Visualizations;
