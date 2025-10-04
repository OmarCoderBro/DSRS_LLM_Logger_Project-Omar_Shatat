const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.post("/api/echo", (req, res) => {
  res.json({ you_sent: req.body });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});