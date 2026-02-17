import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const register = async (req, res) => {
  const { username, email, password, brideName, groomName, dateWedding } =
    req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    brideName,
    groomName,
    dateWedding,
  });

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
};

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { username, email, password, brideName, groomName, dateWedding, coverImage } =
    req.body;

  if (username !== undefined) user.username = username;
  if (brideName !== undefined) user.brideName = brideName;
  if (groomName !== undefined) user.groomName = groomName;
  if (dateWedding !== undefined) user.dateWedding = dateWedding;
  if (coverImage !== undefined) user.coverImage = coverImage;

  if (email && email !== user.email) {
    const emailTaken = await User.findOne({ email });
    if (emailTaken) {
      return res.status(400).json({ message: "Email already in use" });
    }
    user.email = email;
  }

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    brideName: updatedUser.brideName,
    groomName: updatedUser.groomName,
    dateWedding: updatedUser.dateWedding,
    coverImage: updatedUser.coverImage,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
