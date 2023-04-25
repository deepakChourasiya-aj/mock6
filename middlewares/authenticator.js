const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')
const authenticator = (req, res, next) => {
  let token = req.cookies.token;
  try {
    if (token) {
      let decoded = jwt.verify(token, "deepak");
      if (decoded) {
        let userID = decoded.userID;
        req.body.userID = userID;
        next();
      } else {
        return res.send({ msg: "login first" });
      }
    } else {
      return res.send({ msg: "login first" });
    }
  } catch (error) {
    res.send({ msg: "server error" });
    console.log(error);
  }
};

module.exports = {
  authenticator
};
