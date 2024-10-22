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

router.get("/", handleGetAllCategories);
router.get("/trash-list", handleGetAllTrashCategories);
router.post("/", handleCreateNewCategory);
router.put("/trash-list/:id", handleRestoreCategory);
router.delete("/trash-list/:id", handleDeleteCategory);
router.get("/:id", handleGetSingleCategory);
router.patch("/:id", handleUpdateCategory);
router.put("/:id", handleSoftDeleteCategory);

module.exports = router;
