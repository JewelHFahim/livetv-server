const Tvlink = require("../models/tvlink");


// Get All Tv Links
async function handleGetAllTvlinks(req, res) {
    try {
        const tvLinks = await Tvlink.find({deleted: false});
        
        return res.status(200).json({status:"success", message: "tvlinks list", total: tvLinks.length, tvLinks});

    } catch (error) {

        console.log(error);

        return res.status(200).json({status:"failed", message: "failed tvlinks list", error})
    }
}

// Create Tv Links
async function handleCreateNewTvlink(req, res) {
  const { tvId, lang, streamFrom, streamLabel, urlPriority, streamUrl } = req.body;

  if (!tvId || !lang || !streamFrom || !streamLabel || !urlPriority || !streamUrl){
    return res.status(400).json({ status: "failed", message: "all fields required" });
 }
  try {
    await Tvlink.create({ tvId, lang, streamFrom, streamLabel, urlPriority, streamUrl});

    return res.status(201).json({status: "succes", message: "tv link create success"});

  } catch (error) {

    console.log(error);

    return res.status(201).json({status: "failed", message: "tv link create failed", error})
  }
}

// Get Single Tv Link
async function handleGetSingleTvLink(req, res) {
  const {id} = req.params;

  if(!id) return res.status(404).json({status:"failed", message:"tv channel link not found"});

  try {
      const tvLink = await Tvlink.findById(id);

      if(!tvLink) return res.status(400).json({status:"failed", message: "tv link not found"})

      return res.status(200).json({status:"success", message: "tv link found success", tvLink});

  } catch (error) {

      console.log(error);

      return res.status(500).json({status:"failed", message: "tv link not found", error})
  }
}

// Update Tv Link
async function handleUpdateTvLink(req, res) {
  const { tvId, lang, streamFrom, streamLabel, urlPriority, streamUrl } = req.body;

  try {
    const tvLink = await Tvlink.findByIdAndUpdate(req.params.id, {tvId, lang, streamFrom, streamLabel, urlPriority, streamUrl});

    if(!tvLink) return res.status(400).json({status:"failed", message: "tv link not found"})

    return res.status(201).json({status: "succes", message: "tv link update success"});

  } catch (error) {

    console.log(error);

    return res.status(201).json({status: "failed", message: "tv link update failed", error})
  }
}

// Delete Tv Link
async function handleDeleteTvLink(req, res) {
  try {
  const tvLink =  await TvlinkfindByIdAndDelete(req.params.id);

   if(!tvLink) return res.status(400).json({status:"failed", message: "tv link not found"});

    return res.status(201).json({status: "succes", message: "tv link success"})
    
  } catch (error) {

    console.log(error);

    return res.status(500).json({status: "failed", message: "tv link delete failed", error})
  }
}

// Soft Delete/Move to Trash tv link
async function handleSoftDeleteTvlink(req, res) {
  try {
  const tvLink = await Tvlink.findByIdAndUpdate(req.params.id, {deleted: true, deletedAt: Date.now()});

  if(!tvLink) return res.status(400).json({status:"failed", message: "tv link not found"})

    return res.status(201).json({status: "succes", message: "tv link move trash success"});

  } catch (error) {

    console.log(error);

    return res.status(500).json({status: "failed", message: "tv link move trash failed", error})
  }
}

// Get All Trash Tv List Link
async function handleGetAllTvLinkTrash(req, res) {
  try {
      const tvlinkList = await Tvlink.find({deleted: true});

      return res.status(200).json({status:"success", message: "tv link list success", total: tvlinkList.length, tvlinkList})

  } catch (error) {

      console.log(error);

      return res.status(200).json({status:"failed", message: "tv link list failed", error})
  }
}

// Restore tv link from Trash
async function handleRestoreTvlink(req, res) {
  try {
   const tvLink =  await Tvlink.findByIdAndUpdate(req.params.id, {deleted: false, deletedAt: null});

   if(!tvLink) return res.status(400).json({status:"failed", message: "tv link not found"})

    return res.status(201).json({status: "succes", message: "tv link restore success"});

  } catch (error) {

    console.log(error);

    return res.status(500).json({status: "failed", message: "tv link restore failed", error})
  }
}

module.exports= {
    handleGetAllTvlinks,
    handleCreateNewTvlink,
    handleGetSingleTvLink,
    handleUpdateTvLink,
    handleDeleteTvLink, 
    handleSoftDeleteTvlink,
    handleGetAllTvLinkTrash,
    handleRestoreTvlink
}