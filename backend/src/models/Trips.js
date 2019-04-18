var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var tripSchema = new Schema({
    startAddress: String,
    endAddress: String,
    departureDate: Date,
    roundTrip: Boolean,
    returnDate: Date,
    passangers: Number,
    price: Number,
    user: {
      _id: String,
      userName: String,
      firstName: String,
      lastName: String,
      email: String,
      role: Number, //0: passneger, 1: driver, 2: admin  
    }
  },
  {timestamps: true})

module.exports = mongoose.model("Trips", tripSchema);