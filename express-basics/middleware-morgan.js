const express = require("express");
const morgan = require("morgan");

const app = express();

// Use morgan middleware
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
