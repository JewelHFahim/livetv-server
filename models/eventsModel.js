const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    sport_name: {
      type: String,
      // required: true,
    },

    event_id: {
      type: String,
      // required: true,
    },

    event_name: {
      type: String,
      // required: true,
    },

    event_time: {
      type: Date,
      // required: true,
    },

    istream: {
      type: String,
    },

    timezone: {
      type: String,
      default: "UTC",
    },

    iscore: {
      type: String,
    },

    thumb: {
      type: String,
    },
  },
  { timestamps: true }
);

const Events = mongoose.model("event", eventSchema);

module.exports = Events;
