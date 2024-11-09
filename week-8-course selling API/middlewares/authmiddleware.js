const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log("from middleware");

  try {
    const { token } = req.headers;

    const admin = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    console.log(admin);

    req.admin = admin;
    next();
  } catch (error) {
    res.json({
      message: "you are not authorized!",
      error,
    });
  }
};

module.exports = auth;
