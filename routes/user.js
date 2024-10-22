const express = require("express");
const {
  handleSignupNewUser,
  handleLoginUser,
  handleLogoutUser,
} = require("../controllers/user");
const router = express.Router();


router.post("/signup", handleSignupNewUser);
router.post("/login", handleLoginUser);
router.post("/logout", handleLogoutUser);


module.exports = router;
