var mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true)
var userSchema = new Schema({
    userName: { type: String, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    role: { type: Number, required: true}, //0: passneger, 1: driver, 2: admin
    lastLogin: Date
  },
  {timestamps: true});

module.exports = mongoose.model("Users", userSchema);