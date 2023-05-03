const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];
  if(!authHeader){
    console.log("No token");
  }

  let decodedToken = jwt.verify(token, 'somesupersecretsecret');

  if(!decodedToken){
    console.log('Not authenticated');
  }
  req.userId = decodedToken.userId;
  next();
}
