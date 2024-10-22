const express = require("express");
const {
  handleGetAllUser,
  handleUpdateUser,
  handleGetSingleUser,
} = require("../controllers/user");
const router = express.Router();

router.get("/", handleGetAllUser);
router.patch("/:id", handleUpdateUser);
router.get("/:id", handleGetSingleUser);

module.exports = router;
