const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  modelYear: {
    type: Number,
    require: true,
  },
  make: {
    type: String,
    require: true,
  },
  currentOwner: {
    type: String,
    require: true,
  },
  registration: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model('Car', carSchema)