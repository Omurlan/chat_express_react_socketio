const chatModel = require("../models/chatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel
      .findOne({
        members: { $all: [firstId, secondId] },
      })
      .populate("members", "name");

    if (chat) {
      return res.json(chat);
    }

    const newChat = new chatModel({
      members: [firstId, secondId],
    });

    const response = await newChat.save();

    const populatedResponse = await response.populate("members", "name");

    res.json(populatedResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserChat = async (req, res) => {
  const userId = req.params.userId;

  try {
    const chats = await chatModel
      .find({
        members: { $in: userId },
      })
      .populate("members", "name");

    res.json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel
      .findOne({
        members: { $all: [firstId, secondId] },
      })
      .populate("members", "name");

    res.json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createChat,
  findChat,
  findUserChat,
};
