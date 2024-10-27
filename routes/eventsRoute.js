const express = require("express");
const {
  handleFetchandSaveEvents,
  handleGetAllEvents,
  handleGetEventDetails,
  handleUpdateEvent,
  handleDeleteEvent,
  handleCreateEvent,
} = require("../controllers/eventsController");
const router = express.Router();

router.post("/event", handleFetchandSaveEvents);
router.post("/event/add", handleCreateEvent);
router.get("/event", handleGetAllEvents);
router.get("/event/:id", handleGetEventDetails);
router.put("/event/:id/update", handleUpdateEvent);
router.delete("/event/:id", handleDeleteEvent);

module.exports = router;
