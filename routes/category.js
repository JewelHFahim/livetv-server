const express = require("express");
const {
  handleCreateNewCategory,
  handleGetAllCategories,
  handleGetSingleCategory,
  handleUpdateCategory,
  handleGetAllTrashCategories,
  handleSoftDeleteCategory,
  handleRestoreCategory,
} = require("../controllers/category");
const router = express.Router();

router.get("/", handleGetAllCategories);
router.post("/", handleCreateNewCategory);
router.get("/:id", handleGetSingleCategory);
router.patch("/:id", handleUpdateCategory);
router.put("/:id", handleSoftDeleteCategory);
router.put("/trash-list/:id", handleRestoreCategory);
router.get("/trash-list", handleGetAllTrashCategories);

module.exports = router;
