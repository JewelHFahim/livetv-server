const Events = require("../models/eventsModel");

// Get All Channels
async function handleGetAllEventsClient(req, res) {
  try {
    const allEvents = await Events.find();

    return res.status(200).json({
      status: true,
      message: "all events found",
      data: {
        allEvents,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: false,
      message: error.message,
    });
  }
}

module.exports = {
  handleGetAllEventsClient,
};
