const express = require("express");
const {
  handleCreateNewCategory,
  handleGetAllCategories,
  handleGetSingleCategory,
  handleUpdateCategory,
  handleGetAllTrashCategories,
  handleSoftDeleteCategory,
  handleRestoreCategory,
  handleDeleteCategory,
} = require("../controllers/category");
const router = express.Router();

router.get("/trash-list", handleGetAllTrashCategories);
router.put("/trash-list/:id", handleRestoreCategory);
router.delete("/trash-list/:id", handleDeleteCategory);
router.put("/edit/:id", handleUpdateCategory);
router.get("/", handleGetAllCategories);
router.post("/", handleCreateNewCategory);
router.get("/:id", handleGetSingleCategory);
router.put("/:id", handleSoftDeleteCategory);

module.exports = router;
