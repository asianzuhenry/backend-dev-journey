const jwt = require('jsonwebtoken')

// secret key
const secretKey = 'mysecretkey'

user = {
    username: 'henry',
    password: '12345678'
}

// create a token
const token = jwt.sign(user, secretKey, { expiresIn: '1h'})
console.log('Generated Token:',token);


// verify token

try {
    const decoded = jwt.verify(token, secretKey)
    console.log("Decoded Payload:", decoded);
    
} catch (error) {
    console.error("Invalid Token:", error.message);
    
}