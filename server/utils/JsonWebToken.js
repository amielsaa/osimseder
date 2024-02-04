const jwt = require('jsonwebtoken');

// Generate Token
 const generateToken =  (user, password) => {jwt.sign(user, password, { expiresIn: '1h' })}; // Expires in 1 hour


//authenticate a token
const authenticateToken = (token,password) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, password, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = {generateToken, authenticateToken}