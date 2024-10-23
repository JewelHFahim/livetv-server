const express = require("express");
const {
  handleGetAllUser,
  handleUpdateUser,
  handleDeleteUser,
  handleSignupNewUser,
} = require("../controllers/user");
const router = express.Router();

router.post("/signup", handleSignupNewUser);
router.get("/", handleGetAllUser);
router.delete("/:id", handleDeleteUser);
router.put("/:id", handleUpdateUser);
// router.get("/:id", handleGetSingleUser);

module.exports = router;
