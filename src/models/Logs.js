var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var logsSchema = new Schema({
    userID: String,
    user: String,
    event: String
  },{timestamps: true})

module.exports = mongoose.model("Logs", logsSchema);