import Chat from "../models/Chat.js";
import ChatMessage from "../models/ChatMessage.js";

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).sort({ createdAt: 1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChat = async (req, res) => {
  try {
    const { type, subjectId, title } = req.body;

    const existing = await Chat.findOne({
      user: req.user.id,
      type,
      subjectId: String(subjectId),
    });
    if (existing) return res.status(200).json(existing);

    const chat = new Chat({
      type,
      subjectId: String(subjectId),
      title,
      user: req.user.id,
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    await ChatMessage.deleteMany({ user: req.user.id, vendor: chat.subjectId });

    res.status(200).json({ message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
