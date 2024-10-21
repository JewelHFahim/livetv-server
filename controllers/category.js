const Category = require("../models/category");

// Get All Categories
async function handleGetAllCategories(req, res) {
  try {
    const categories = await Category.find({ deleted: false });

    return res
      .status(200)
      .json({ status: "success", total: categories.length, categories });
  } catch (error) {
    return res.json({ status: "failed", error });
  }
}

// Get All Trash Categories
async function handleGetAllTrashCategories(req, res) {
  try {
    const categories = await Category.find({ deleted: true });

    return res
      .status(200)
      .json({ status: "success", total: categories.length, categories });
  } catch (error) {
    return res.json({ status: "failed", error });
  }
}

// Get Single Category
async function handleGetSingleCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);

    return res.status(200).json({ status: "success", category });
  } catch (error) {
    return res.json({ status: "failed", error });
  }
}

// Soft delete category
const handleSoftDeleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category moved to trash" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Restore Category
const handleRestoreCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        deleted: false,
        deletedAt: null,
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category restore success" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Update Category
async function handleUpdateCategory(req, res) {
  const { catName } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      catName,
    });

    return res.status(201).json({ status: "update success" });
  } catch (error) {
    return res.json({ status: "failed", error });
  }
}

// Create
async function handleCreateNewCategory(req, res) {
  const { catName } = req.body;
  try {
    if (!catName) {
      return res.status(400).json({ status: "category name required" });
    }

    await Category.create({ catName });

    return res.status(201).json({ status: "category created success" });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

module.exports = {
  handleCreateNewCategory,
  handleGetAllCategories,
  handleGetSingleCategory,
  handleUpdateCategory,
  handleGetAllTrashCategories,
  handleSoftDeleteCategory,
  handleRestoreCategory
};
