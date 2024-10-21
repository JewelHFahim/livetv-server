const express = require("express");
const {
  handleSignupNewUser,
  handleGetAllUser,
  handleLoginUser,
  handleLogoutUser,
} = require("../controllers/user");
const router = express.Router();

router.get("/login", (req, res) => {
  return res.render("login");
});

router.post("/signup", handleSignupNewUser);
router.post("/login", handleLoginUser);
router.get("/logout", handleLogoutUser);
router.get("/", handleGetAllUser);

module.exports = router;
