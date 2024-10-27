const { default: axios } = require("axios");
const cron = require("node-cron");
const Events = require("../models/eventsModel");

// Fetch and Save Channels in DB
const handleFetchandSaveEvents = async (req, res) => {
  try {
    console.log("Fetching events...");
    const response = await axios.get(
      "https://tvapp.1ten.live/api/cricbuzz/get-events"
    );
    const events = response.data.data;

    if (!Array.isArray(events)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid events data" });
    }

    const latestEvent = await Events.findOne()
      .sort({ event_time: -1 })
      .select("event_time");

    const latestEventTime = latestEvent
      ? new Date(latestEvent.event_time)
      : new Date(0);

    const newEvents = events
      .filter((event) => new Date(event.event_time) > latestEventTime)
      .map((event) => {
        // ...event,
        // thumb: `https://example.com/thumbnails/${event.event_id}.jpg`,

        // const eventDate = new Date(event.event_time);

        // Convert to 'Asia/Dhaka' timezone (UTC+6)
        // const localTime = eventDate.toLocaleString("en-GB", {
        //   timeZone: "Asia/Dhaka",
        //   year: "numeric",
        //   month: "2-digit",
        //   day: "2-digit",
        //   hour: "2-digit",
        //   minute: "2-digit",
        //   second: "2-digit",
        // });

        // Format the localTime as a date-time string for consistency
        // const [datePart, timePart] = localTime.split(", ");
        // const [day, month, year] = datePart.split("/");
        // const formattedLocalTime = `${year}-${month}-${day}T${timePart}.000Z`;

        return {
          ...event,
          //   event_time: formattedLocalTime,
          thumb: `https://example.com/thumbnails/${event.event_id}.jpg`,
        };
      });

    if (newEvents.length > 0) {
      await Events.insertMany(newEvents);
      console.log("New events saved:", newEvents.length);
      return res.status(200).json({
        status: true,
        message: `${newEvents.length} new events saved`,
        newEvents,
      });
    } else {
      console.log("No new events to save");
      return res.status(200).json({
        status: true,
        message: "No new events to save",
      });
    }
  } catch (error) {
    console.error("Error fetching or saving events:", error);
    return res.status(500).json({
      status: false,
      message: "Error fetching or saving events",
      error: error.message,
    });
  }
};
cron.schedule("*/5 * * * *", handleFetchandSaveEvents);

// Create Event
async function handleCreateEvent(req, res) {
  const { sport_name, event_id, event_name, event_time, istream, iscore,  thumb } = req.body;
  console.log({ sport_name, event_id, event_name, event_time, istream, iscore,  thumb })

//   if(!sport_name || !event_id || !event_name || !istream || !iscore){
//     return res.status(400).json({status: false, message: "all field required"})
//   }

  try {
    const event = await Events.create({sport_name, event_id, event_name, event_time, istream, iscore,  thumb});

    if (!event) return res.status(400).json({ status: false, message: "event not created" });

    return res.status(201).json({ status: true, message: "event created" });
  } catch (error) {
    console.log(error);

    return res.status(201).json({ status: false, message: "event create failed", error });
  }
}

// Get All Channels
async function handleGetAllEvents(req, res) {
  try {
    const allEvents = await Events.find({});

    return res.status(200).json({
      status: true,
      message: "all events found",
      total: allEvents.length,
      allEvents,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "something happend wrong from server",
      error,
    });
  }
}

// Get Single Event/ Event Details
async function handleGetEventDetails(req, res) {
  const { id } = req.params;

  if (!id)
    return res.status(404).json({ status: false, message: "event not found" });

  try {
    const eventDetails = await Events.findById(id);

    if (!eventDetails)
      return res
        .status(400)
        .json({ status: false, message: "event not found" });

    return res
      .status(200)
      .json({ status: true, message: "event found success", eventDetails });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ status: false, message: "event not found", error });
  }
}

// update Event
async function handleUpdateEvent(req, res) {
  const { sport_name, event_name, thumb } = req.body;

  try {
    const tvChannel = await Events.findByIdAndUpdate(req.params.id, {
      sport_name,
      event_name,
      thumb,
    });

    if (!tvChannel)
      return res
        .status(400)
        .json({ status: false, message: "event not found" });

    return res.status(201).json({ status: true, message: "event update" });
  } catch (error) {
    console.log(error);

    return res
      .status(201)
      .json({ status: false, message: "event update failed", error });
  }
}

// Delete Event
async function handleDeleteEvent(req, res) {
  try {
    const event = await Events.findByIdAndDelete(req.params.id);

    if (!event)
      return res
        .status(400)
        .json({ status: false, message: "event not found" });

    return res
      .status(201)
      .json({ status: true, message: "event delete success" });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ status: false, message: "event delete failed", error });
  }
}
module.exports = {
  handleFetchandSaveEvents,
  handleGetAllEvents,
  handleGetEventDetails,
  handleUpdateEvent,
  handleDeleteEvent,
  handleCreateEvent
};
