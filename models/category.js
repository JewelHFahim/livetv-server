const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    catName: {
      type: String,
      requires: true,
      unique: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
