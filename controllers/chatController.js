import ChatMessage from "../models/ChatMessage.js";
import User from "../models/User.js";

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

export const getVendorConversations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "vendor" || !user.vendorId) {
      return res.status(403).json({ message: "Not a vendor" });
    }

    const userIds = await ChatMessage.distinct("user", { vendor: user.vendorId });

    const users = await User.find({ _id: { $in: userIds } }).select("username brideName groomName");

    const conversations = users.map((u) => ({
      userId: u._id,
      name: u.brideName && u.groomName
        ? `${u.brideName} & ${u.groomName}`
        : u.username,
    }));

    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVendorMessages = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "vendor" || !user.vendorId) {
      return res.status(403).json({ message: "Not a vendor" });
    }

    const messages = await ChatMessage.find({
      vendor: user.vendorId,
      user: req.query.user,
    }).sort({ createdAt: 1 });

    const flipped = messages.map((m) => ({
      _id: m._id,
      from: m.from === "me" ? "them" : "me",
      text: m.text,
      type: m.type,
      createdAt: m.createdAt,
    }));

    res.json(flipped);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendVendorMessage = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "vendor" || !user.vendorId) {
      return res.status(403).json({ message: "Not a vendor" });
    }

    const message = await ChatMessage.create({
      user: req.body.user,
      vendor: user.vendorId,
      from: "them",
      text: req.body.text,
      type: req.body.type || "text",
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
