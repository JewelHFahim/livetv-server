const Livetv = require("../models/livetv");


// Create Livetv
async function handleCreateLivetv(req, res) {
  const { channelName, description, categoryId } = req.body;

  const posterFile = req.files['poster'] ? req.files['poster'][0] : "";
  const thumbFile = req.files['thumb'] ? req.files['thumb'][0] : "";

  if (!channelName || !description  || !categoryId) {
    return res.status(400).json({ status: 'failed', message: 'All fields are required, including files.' });
  }

  try {
    const posterName = posterFile.filename;
    const thumbName = thumbFile.filename;

    await Livetv.create({
      channelName,
      description,
      posterName,
      thumbName,
      categoryId
    });
    
    return res.status(201).json({ status: 'success', message: 'TV channel created successfully.' });
  } catch (error) {
    console.error('Error creating TV channel:', error);
    return res.status(500).json({ status: 'failed', message: 'TV channel creation failed.', error });
  }
}



// Get All Live Tv List
async function handleGetAllLivetvList(req, res) {
    try {
        const livetvList = await Livetv.find({deleted: false}).populate('categoryId');

        return res.status(200).json({status:"success", message: "livetv list", total: livetvList.length, livetvList});

    } catch (error) {

        console.log(error);

        return res.status(200).json({status:"failed", message: "failed livetv list", error})
    }
}

// Get Single Tv channel
async function handleGetSingleTvChannel(req, res) {
    const {id} = req.params;

    if(!id) return res.status(404).json({status:"failed", message:"tv channel not found"});

    try {
        const tvChannel = await Livetv.findById(id).populate('categoryId');

        if(!tvChannel) return res.status(400).json({status:"failed", message: "livetv channle not found"})

        return res.status(200).json({status:"success", message: "livetv channel found success", tvChannel});

    } catch (error) {

        console.log(error);

        return res.status(500).json({status:"failed", message: "livetv channel not found", error})
    }
}

// Update Livetv
async function handleUpdateLivetv(req, res) {
    const { channelName, description, posterName, thumbName, categoryId, isPaid,isFeatured } = req.body;
  
    try {
      const tvChannel = await Livetv.findByIdAndUpdate(req.params.id, {channelName, description, posterName, thumbName, isPaid, isFeatured, categoryId});

      if(!tvChannel) return res.status(400).json({status:"failed", message: "livetv channle not found"})
  
      return res.status(201).json({status: "success", message: "tv channel update success"});

    } catch (error) {

      console.log(error);

      return res.status(201).json({status: "failed", message: "tv channel update failed", error})
    }
  }

// Soft Delete/Move to Trash Livetv
async function handleSoftDeleteTv(req, res) {
    try {
    const tvChannel = await Livetv.findByIdAndUpdate(req.params.id, {deleted: true, deletedAt: Date.now()});

    if(!tvChannel) return res.status(400).json({status:"failed", message: "livetv channle not found"})
  
      return res.status(201).json({status: "succes", message: "tv channel move trash success"});

    } catch (error) {

      console.log(error);

      return res.status(500).json({status: "failed", message: "tv channel move trash failed", error})
    }
  }

// Get All Trash Tv List
async function handleGetAllTrashTvList(req, res) {
    try {
        const livetvTrashList = await Livetv.find({deleted: true});

        return res.status(200).json({status:"success", message: "livetv list", total: livetvTrashList.length, livetvTrashList})

    } catch (error) {

        console.log(error);

        return res.status(200).json({status:"failed", message: "failed livetv list", error})
    }
}

// Restore tv from Trash
async function handleRestoreFromTrash(req, res) {
    try {
     const tvChannel =  await Livetv.findByIdAndUpdate(req.params.id, {deleted: false, deletedAt: null});

     if(!tvChannel) return res.status(400).json({status:"failed", message: "livetv channle not found"})
  
      return res.status(201).json({status: "succes", message: "tv channel restore success"});

    } catch (error) {

      console.log(error);

      return res.status(500).json({status: "failed", message: "tv channel restore failed", error})
    }
  }

// Delete Tv Channel
async function handleDeleteTvChannel(req, res) {
    try {
    const tvChanneel =  await Livetv.findByIdAndDelete(req.params.id);

     if(!tvChanneel) return res.status(400).json({status:"failed", message: "livetv channel not found"});

      return res.status(201).json({status: "succes", message: "tv channel delete success"})
      
    } catch (error) {

      console.log(error);

      return res.status(500).json({status: "failed", message: "tv channel delete failed", error})
    }
  }

module.exports = {
    handleCreateLivetv,
    handleGetAllLivetvList,
    handleGetSingleTvChannel, 
    handleUpdateLivetv,
    handleSoftDeleteTv,
    handleGetAllTrashTvList,
    handleRestoreFromTrash,
    handleDeleteTvChannel
}
