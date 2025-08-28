const http = require('http')

// create server 
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("content-type", "text/plain")
    res.end("Hello, World! This is my first Node.js server.\n")
})

const PORT = 3002
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})