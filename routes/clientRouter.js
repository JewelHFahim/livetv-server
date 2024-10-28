const express = require("express");
const { handleGetAllEventsClient } = require("../controllers/clientCntroller");
const router = express.Router();

router.get("/live-tv", handleGetAllEventsClient);

module.exports = router;
