var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var chatSchema = new Schema({
    users: String,
    messages: [{
        user: String,
        message: String
    },{timestamps: true}]
  })

module.exports = mongoose.model("Chats", chatSchema);