const express = require("express");
const { handleLoginUser, handleLogoutUser, handleGetSingleUser } = require("../controllers/user");
const router = express.Router();

router.post("/login", handleLoginUser);
router.post("/logout", handleLogoutUser);
router.get("/:id", handleGetSingleUser);


module.exports = router;
