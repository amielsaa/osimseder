const jwt = require('jsonwebtoken');

// Generate Token
 const generateToken =  (user, password) => {jwt.sign(user, password, { expiresIn: '1h' })}; // Expires in 1 hour


 const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if(!accessToken) return res.json({error:"User not logged in"});
  try{
      const validToken = verify(accessToken, "importantsecret");
      req.user = validToken;
      if(validToken) {
          return next();
      }
  } catch(err) {
      return res.json({error:err});
  }
}

module.exports = {generateToken, validateToken}