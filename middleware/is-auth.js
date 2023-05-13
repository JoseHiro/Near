const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  if(!authHeader){
    return res.status(400).json({ message: "Authenctication failed"})
  }
  
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, 'somesupersecretsecret');
    if(!decodedToken){
      throw new Error("Authenctication failed")
    }
  } catch (error) {
    return res.status(400).json({message: error})
  }

  req.userId = decodedToken.userId;
  next();
}
