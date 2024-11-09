const { Admin, Course } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminSignUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedpassword = await bcrypt.hash(password, 5);

    const createdAdmin = await Admin.create({
      username,
      email,
      password: hashedpassword,
    });

    res.status(200).json({
      message: "Admin sucessfully signed up. ✅",
      username: createdAdmin.username,
    });
  } catch (error) {
    res.status(400).json({
      message: "user unable to signed up. ❌",
      error: error.message,
    });
  }
};

const adminSignIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundAdmin = await Admin.findOne({
      username,
    });

    if (foundAdmin) {
      const passwordmatch = await bcrypt.compare(password, foundAdmin.password);

      if (passwordmatch) {
        let token = jwt.sign(
          { id: foundAdmin._id },
          process.env.JWT_ADMIN_SECRET
        );

        res.status(200).json({
          message: "Admin succesfully logged in. ✅",
          username: foundAdmin.username,
          email: foundAdmin.email,
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

const createCourse = async (req, res) => {
  const { title, description, price, imageurl } = req.body;

  try {
    const createdCourse = await Course.create({
      title,
      description,
      price,
      imageurl,
      creatorId: req.admin.id
    });

    res.json({
      message: "done creating course.",
      title,
      creatorId: createdCourse.creatorId,
    });
  } catch (error) {
    res.json({
      message: "server error.",
      error,
    });
  }
};

module.exports = {
  adminSignUp,
  adminSignIn,
  createCourse,
};
