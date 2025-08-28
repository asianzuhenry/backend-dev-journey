const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());


const JWT_SECRET = 'mysecretkey'
const REFRESH_SECRET = 'myrefreshsecret'

// Dummy users (simulate DB)
const users = [
    { id: 1, username: 'admin', password: 'admin123' },
    { id: 2, username: 'user', password: 'user123' }
]

// In-memory refresh token store (use DB in real apps)
const refreshTokens = []

// Generate tokens
const generateTokens = (user) => {
    const accessToken = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET, 
        { expiresIn: '15m'}
    );

    const refreshToken = jwt.sign(
        { userId: user.id, username: user.username }, 
        REFRESH_SECRET, 
        { expiresIn: '7d'}
    );

    refreshTokens.push(refreshToken); // store refresh token
    return { accessToken, refreshToken };
}

app.post('/login', (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)

    if (!user) return res.status(401).json({ message: 'Invalid Credentials'})

    const tokens = generateTokens(user)
    res.json(tokens)
})

// Refresh token route
app.post('/refresh', (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken || !refreshTokens.includes(refreshToken)) {
        return res.status(403).json({ message: "Refresh Token not found, Login again"})
    }

    try {
        const user = jwt.verify(refreshToken, REFRESH_SECRET)
        const tokens = generateTokens(user)

        // Remove old refresh token & store new one
        refreshTokens = refreshTokens.filter(token => token !== refreshToken)
        refreshToken.push(tokens.refreshToken)

        res.json(tokens)
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token"})
    }
})

// Logout route (invalidate refresh token)
app.post('/logout', (req, res) => {
    const { refreshToken } = req.body
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)
    res.json({ message: "you have been logged out"})
})

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const { authHeader } = req.headers.authorization
    if (!authHeader) return res.status(401).json({ message: "no token provided"})

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "invalid or expired token"})
    }
}

// Protected route
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}`})
})


app.listen(3001, () => console.log('server running on port 3001'))