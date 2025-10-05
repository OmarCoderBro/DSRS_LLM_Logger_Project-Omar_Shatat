import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai"; //IMPORTING NECESSARY PLUGINS FOR GOOGLE GEMINI GENAI USE
import cors from "cors"; //IMPORTING CORS FOR CROSS PORT ACCESS AND INTERACTION
//import pool from "./db.js"; //IMPORTING POOL SO WE CAN INTERACT WITH POSTGRES DATABASE THROUGH JS


const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
dotenv.config();


const geminiApiKey = process.env.GEMINI_API_KEY //REFERENCE TO MY .ENV FILE WHICH CONTAINS MY API KEY

//AT THIS POINT, I USE GEMINI'S PIPELINE TO IMPORT THE API KEY, THIS IS AFTER IT PROCESSES MY .ENV FILE WHICH CONTAINS MY
//GEMINI API KEY, SOME KEYS HAVE ACCESS TO DIFFERENT MODELS, THIS IS THE ENTRY FOR UTILIZNG THE KEY IN MY API
const genAI = new GoogleGenAI({ apiKey: geminiApiKey});






app.post("/api/query", async (req, res) => { //THIS IS THE POST REQUEST THAT SENDS A USER'S QUERY, IN REQ.BODY CONTAINS THE MODEL AND THE PROMPT THE USER CHOSE
  const { model, prompt } = req.body;

  try {
    console.log("Calling Gemini API with model:", model, "prompt:", prompt);
    const response = await genAI.models.generateContent({ //RIGHT HERE IS WHERE WE CALL GEMINI'S GENERATECONTENT, SPECIFIC TO GOOGLE GEMINI API
      model: model || "gemini-2.5-flash", //SEND MODEL
      contents: [{ type: "text", text: prompt }], //SEND THE PROMPT IN THE TEXT FIELD
    });
    const text = response.text || "No output";
    res.json({ response: text }); //RESPONSE IS STORED IN 'TEXT'
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({ error: "Failed to get model response", details: err.message });
  }
});







/*
app.post("/api/log", async (req, res) => { //POST METHOD THAT SENDS DATA, SPECIFICALLY A FULL LLM LOG, INTO THE POSTGRESQL DATABASE, LOCAL ONLY FOR NOW, CONFIGURED THROUGH MY MAC.
  const { model, prompt, response, latency_ms, created_at, hallucination_score, prompt_length, response_length } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO llm_logs (model, prompt, response, latency_ms, created_at, hallucination_score, prompt_length, response_length)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [model, prompt, response, latency_ms, created_at, hallucination_score, prompt_length, response_length]
    );
    res.json({ success: true, log: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
*/ 
//THE REASON THIS IS COMMENTED OUT, IS BECAUSE THE CURRENT POSTGRES DATABASE IS CONFIGURED TO MY LOCAL MACHINE, I THOUGHT IT WOULD MAKE TESTING AND DEMOING EASIER






/*
app.delete("/api/clear-logs", async (req, res) => { //DELETE REQUEST THAT CLEARS ALL THE LOGS FROM OUR LOG TABLE, WE DELETE IT IN THE POSTGRESQL DATABASE AND CLEAR FRONTEND
  try {
    await pool.query("DELETE FROM llm_logs");
    res.json({ success: true, message: "All logs cleared." });
  } catch (err) {
    console.error("Error clearing logs:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
*/