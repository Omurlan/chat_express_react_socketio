const { default: mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: mongoose.Types.ObjectId,
    senderId: mongoose.Types.ObjectId,
    text: String,
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("Message", messageSchema);

module.exports = messageModel;
