const { default: mongoose } = require("mongoose");

async function mongoDB(url) {
  return mongoose.connect(url);
}

module.exports = mongoDB;
