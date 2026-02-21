import Guest from "../models/Guest.js";

export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id });
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGuest = async (req, res) => {
  try {
    const { name, side, group, status, seats, note } = req.body;
    const guest = new Guest({
      name,
      side,
      group,
      status,
      seats,
      note,
      user: req.user.id,
    });
    await guest.save();
    res.status(201).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    res.status(200).json({ message: "Guest deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
