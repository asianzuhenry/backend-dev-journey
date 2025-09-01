const express = require("express");
const app = express();

// Normal route
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

// Route that throws an error
app.get("/error", (req, res, next) => {
  const err = new Error("Intentional Error!");
  next(err); // Pass error to middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error("Error caught:", err.message);
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
