import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LLMLogsTable from "./logtable";

const sampleLogs = [
  {
    model: "gemini-2.0-flash",
    prompt: "Hello",
    response: "Hi there!",
    latency_ms: 100,
    hallucination_score: 0.1,
    prompt_length: 5,
    response_length: 9,
    created_at: "2025-10-05T20:00:00.000Z",
  },
  {
    model: "gemini-2.5-pro",
    prompt: "Test",
    response: "Response",
    latency_ms: 200,
    hallucination_score: 0.2,
    prompt_length: 4,
    response_length: 8,
    created_at: "2025-10-05T21:00:00.000Z",
  },
];

test("renders logs in table", () => { //TEST CHECKS IF LOGS ACTUALLY SHOW UP IN LOGTABLE
  render(<LLMLogsTable logs={sampleLogs} setLogs={() => {}} />);

  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText("Test")).toBeInTheDocument();
  expect(screen.getByText(/Model/i)).toBeInTheDocument();
  expect(screen.getByText(/Prompt/i)).toBeInTheDocument();
});

test("Clear Logs button calls setLogs", () => {  //TEST CHECKS IF CLEARING THE LOGS (USING CLEAR BUTTON) TRIGGERS SETLOGS TO [] THE EMPTY SET
  const mockSetLogs = jest.fn(); 
  render(<LLMLogsTable logs={sampleLogs} setLogs={mockSetLogs} />);
  window.confirm = jest.fn(() => true);

  const clearButton = screen.getByText(/Clear Logs/i);
  fireEvent.click(clearButton);
  expect(mockSetLogs).toHaveBeenCalledWith([]);
});