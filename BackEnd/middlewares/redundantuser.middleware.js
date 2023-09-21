const { UserModel } = require("../model/user.model");

const redundantuser = async (req, res, next) => {
  const { email } = req.body;
  try {
    let userAlreadyExists = await UserModel.find({ email });
    if (userAlreadyExists.length) {
      res.status(200).send({
        msg: "User Account already Exists..Please login using your Password to continue...",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).send({
      msg: "Error in redundant user checker middleware",
      error: error,
    });
  }
};

module.exports = { redundantuser };
