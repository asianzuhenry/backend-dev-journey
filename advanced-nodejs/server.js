const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

// Secret key (in real projects, store in process.env.JWT_SECRET)
const JWT_SECRET = "mysecretkey";

// Dummy user (for demonstration)
const users = [
  { id: 1, username: "admin", password: "admin123" },
  { id: 2, username: "user", password: "user123" },
];

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token })
});

// Protected route example
app.get('/dashboard', (req, res) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: "No token provided"})

        const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        res.send(`Welcome ${decoded.username}`)
    } catch (error) {
        console.log(error);
        
    }
})

app.listen(3000, () => console.log('Server running on port 3000'))