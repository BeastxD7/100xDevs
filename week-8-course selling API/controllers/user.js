const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedpassword = await bcrypt.hash(password, 5);

    const createdUser = await User.create({
      username,
      email,
      password: hashedpassword,
    });

    res.status(200).json({
      message: "user sucessfully signed up.✅",
      username: createdUser.username,
    });
  } catch (error) {
    res.status(400).json({
      message: "user unable to signed up. ❌",
      error: error.message,
    });
  }
};

const userSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({
      username,
    });

    if (foundUser) {
      const passwordmatch = await bcrypt.compare(password, foundUser.password);

      if (passwordmatch) {
        let token = jwt.sign(
          { id: foundUser._id },
          process.env.JWT_USER_SECRET
        );

        res.status(200).json({
          message: "user succesfully logged in. ✅",
          username: foundUser.username,
          email: foundUser.email,
          token,
        });
      } else {
        res.status(400).json({
          message: " Invalid credentials ❌",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

module.exports = {
  userSignUp,
  userSignIn,
};