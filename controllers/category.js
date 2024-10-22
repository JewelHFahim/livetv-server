const mongoose = require("mongoose");
const Category = require("../models/category");

// Get All Categories
async function handleGetAllCategories(req, res) {
  try {
    const categories = await Category.find({ deleted: false });
    return res
      .status(200)
      .json({ status: "success", total: categories.length, categories });
  } catch (error) {
    return res.status(500).json({ status: "failed", error });
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
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "failed", message: "Invalid ID format" });
  }
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "failed", message: "Category not found" });
    }
    return res.status(200).json({ status: "success", category });
  } catch (error) {
    return res.json({ status: "failed", error });
  }
}

// Soft delete category
const handleSoftDeleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "failed", message: "Invalid ID format" });
  }

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
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "failed", message: "Invalid ID format" });
  }
  try {
    const category = await Category.findByIdAndUpdate(
      id,
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

// handle delete
const handleDeleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "failed", message: "Invalid ID format" });
  }
  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ status: "succes", message: "Category delete success" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};

// Update Category
async function handleUpdateCategory(req, res) {
  
  const { catName } = req.body;
  const { id } = req.params;

  console.log(catName, id)

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ status: "failed", message: "Invalid ID format" });
  }

  try {
    await Category.findByIdAndUpdate(id, {
      catName,
    });

    return res.status(201).json({ status:"success", message:"update success" });
  } catch (error) {
    return res.json({ status: "failed", message:error });
  }
}

// Create Category
async function handleCreateNewCategory(req, res) {
  const { catName } = req.body;

  try {
    if (!catName) {
      return res
        .status(400)
        .json({ status: "failed", message: "category name required" });
    }

    await Category.create({ catName });

    return res
      .status(201)
      .json({ status: "success", message: "category created success" });
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
  handleRestoreCategory,
  handleDeleteCategory,
};
