const authConfig = require("../configs/auth.config");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const verifySignUpBody = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed! Name is not provided in request body",
      });
    }
    if (!req.body.email) {
      return res.status(400).send({
        message: "Failed! Email is not provided in request body",
      });
    }
    if (!req.body.userId) {
      return res.status(400).send({
        message: "Failed! UserId is not provided in request body",
      });
    }
    const user = await user_model.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(400).send({
        message: "Failed! user with same userId is already present",
      });
    }
    next();
  } catch (error) {
    console.log("Error while validating the request body : ", error);
    res.status(500).send({
      message: "Error while validating the request body",
    });
  }
};
const verifySignInBody = async (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: "User id is not provided",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "password is not provided",
    });
  }
  next();
};
const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token found : Unauthorised",
    });
  }
  jwt.verify(token, authConfig.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "unauthorised",
      });
    }
    const user = await user_model.findOne({ userId: decoded.id });
    if (!user) {
      return res.status(400).send({
        message: "Unauthorised user for this token does not exist",
      });
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  const user = req.user;
  if (user && user.userType === "ADMIN") {
    next();
  } else {
    return res.status(403).send({
      message: "Only admin users are allowed to access this endpoint",
    });
  }
};

module.exports = {
  verifySignUpBody: verifySignUpBody,
  verifySignInBody: verifySignInBody,
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
