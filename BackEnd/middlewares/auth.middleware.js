const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    try {
      jwt.verify(token, process.env.secretcode, (err, decoded) => {
        if (err) {
          res.status(400).send({ msg: "Verification Failed!", Error: err });
        } else {
          req.body.user = decoded;
          next();
        }
      });
    } catch (error) {
      res.status(400).send({ msg: "Invalid Token", error: error });
    }
  } else {
    res
      .status(400)
      .send({ msg: "Authentication Failed...Please login to continue!" });
  }
};

module.exports = { auth };
