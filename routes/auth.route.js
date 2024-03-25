const authController = require("../controllers/auth.controller");
const authMw = require("../middlewares/auth.mw");
const authMiddleware = require("../middlewares/auth.mw");
module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/auth/signup",
    [authMiddleware.verifySignUpBody],
    authController.signup
  );
  app.post(
    "/ecomm/api/v1/auth/signin",
    [authMw.verifySignInBody],
    authController.signin
  );
};
