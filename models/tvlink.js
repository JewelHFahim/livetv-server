const mongoose = require("mongoose");

const tvlinkSchema = new mongoose.Schema(
  {
    tvId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "livetv",
    },

    lang: {
      type: String,
    },

    streamFrom: {
      type: String,
    },

    streamLabel: {
      type: String,
    },

    urlPriority: {
      type: Number,
    },

    streamUrl: {
      type: String,
      required: true,
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

const Tvlink = mongoose.model("tvlink", tvlinkSchema);

module.exports = Tvlink;
