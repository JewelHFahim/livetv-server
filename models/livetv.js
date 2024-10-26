const mongoose = require("mongoose");

const livetvSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    posterName: {
      type: String,
      default: "../uploads/bbc.jpg",
    },

    thumbName: {
      type: String,
      default: "../uploads/bbc.jpg",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "category",
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

const Livetv = mongoose.model("livetv", livetvSchema);

module.exports = Livetv;
