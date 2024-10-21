const express = require("express");
const {
  handleSignupNewUser,
  handleGetAllUser,
  handleLoginUser,
  handleLogoutUser,
  handleUpdateUser,
  handleGetSingleUser,
} = require("../controllers/user");
const { restricToUser } = require("../middlewares/authentication");
const router = express.Router();

// router.get("/login", (req, res) => {
//   return res.render("login");
// });

router.post("/signup", handleSignupNewUser);
router.post("/login", handleLoginUser);
router.get("/logout", handleLogoutUser);
router.get("/", restricToUser(["admin"]), handleGetAllUser);
router.patch("/:id", restricToUser(["admin"]), handleUpdateUser);
router.get("/:id", restricToUser(["admin"]), handleGetSingleUser);

module.exports = router;
