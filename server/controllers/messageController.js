const messageModel = require("../models/messageModel");

const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  try {
    const newMessage = new messageModel({
      chatId,
      senderId,
      text,
    });

    const response = await newMessage.save();

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const chatId = req.params.chatId;

  console.log("GET MESSAGES");

  try {
    const messages = await messageModel.find({ chatId });

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
};
