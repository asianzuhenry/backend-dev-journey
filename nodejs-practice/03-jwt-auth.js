import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const JWT_SECRET = "your_jwt_secret";

const users = [{ id: 1, username: "user", password: "pass" }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ username }, JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// /profile
app.get("/profile", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = users.find((u) => u.username === decoded.username);
    if (user) {
      res.json({ id: user.id, username: user.username });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

// refresh token
app.post("/refresh", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const newToken = jwt.sign({ username: decoded.username }, JWT_SECRET);
    res.json({ token: newToken });
  });
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
