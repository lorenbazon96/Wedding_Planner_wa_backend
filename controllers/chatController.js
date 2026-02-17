import ChatMessage from "../models/ChatMessage.js";

export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({
      user: req.user.id,
      vendor: req.query.vendor,
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const message = await ChatMessage.create({
      user: req.user.id,
      vendor: req.body.vendor,
      from: req.body.from,
      text: req.body.text,
      type: req.body.type,
    });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
