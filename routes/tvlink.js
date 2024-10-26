const express = require("express");
const { handleGetAllTvlinks, handleCreateNewTvlink, handleGetSingleTvLink, handleUpdateTvLink, handleDeleteTvLink, handleSoftDeleteTvlink, handleGetAllTvLinkTrash, handleRestoreTvlink } = require("../controllers/tvlink");
const router = express.Router();

router.get("/live-tv-link", handleGetAllTvlinks);
router.post("/live-tv-link", handleCreateNewTvlink);
router.get("/live-tv-link/:id", handleGetSingleTvLink);
router.get("/link-trash-list", handleGetAllTvLinkTrash);
router.patch("/live-tv-link/:id/update", handleUpdateTvLink);
router.delete("/trash-live-tv-link/:id", handleDeleteTvLink);
router.put("/live-tv-link/:id", handleSoftDeleteTvlink);
router.put("/restore-live-tv-link/:id", handleRestoreTvlink);


module.exports = router;
