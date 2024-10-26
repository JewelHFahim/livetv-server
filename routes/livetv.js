const express = require("express");
const { handleCreateLivetv, handleGetAllLivetvList, handleUpdateLivetv, handleSoftDeleteTv, handleGetAllTrashTvList, handleRestoreFromTrash, handleDeleteTvChannel, handleGetSingleTvChannel } = require("../controllers/livetv");
const router = express.Router();
const path = require('path');
const multer = require("multer");


// Configure multer storage
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  // Initialize upload with file filter
  const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = fileTypes.test(file.mimetype);
  
      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error('Only images are allowed!'));
      }
    },
  });

router.post("/live-tv", upload.fields([{ name: "poster", maxCount: 1 }, { name: "thumb", maxCount: 1 }]), handleCreateLivetv);
router.get("/live-tv", handleGetAllLivetvList);
router.get("/live-tv/:id", handleGetSingleTvChannel);
router.put("/live-tv/:id", handleUpdateLivetv);
router.put("/trash-tv/:id", handleSoftDeleteTv);
router.get("/trash-tv", handleGetAllTrashTvList);
router.put("/restore-tv/:id", handleRestoreFromTrash);
router.delete("/trash-clear-tv/:id", handleDeleteTvChannel);

module.exports = router;

