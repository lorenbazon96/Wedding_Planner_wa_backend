import User from "../models/User.js";
import Vendor from "../models/Vendor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const register = async (req, res) => {
  const { username, email, password, brideName, groomName, dateWedding, role, vendorName, vendorCategory } =
    req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  };

  if (role === "vendor") {
    const vendor = await Vendor.create({
      name: vendorName || username,
      category: vendorCategory || [],
      email,
    });
    userData.vendorId = vendor._id;
  } else {
    userData.brideName = brideName;
    userData.groomName = groomName;
    userData.dateWedding = dateWedding;
  }

  const user = await User.create(userData);

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    vendorId: user.vendorId,
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
      role: user.role,
      vendorId: user.vendorId,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

export const deleteAccount = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.role === "vendor" && user.vendorId) {
    await Vendor.findByIdAndDelete(user.vendorId);
  }

  await User.findByIdAndDelete(req.user.id);

  res.json({ message: "Account deleted" });
};

export const getVendorProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== "vendor" || !user.vendorId) {
    return res.status(404).json({ message: "Vendor profile not found" });
  }

  const vendor = await Vendor.findById(user.vendorId);
  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  res.json(vendor);
};

export const updateVendorProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== "vendor" || !user.vendorId) {
    return res.status(404).json({ message: "Vendor profile not found" });
  }

  const vendor = await Vendor.findById(user.vendorId);
  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }

  const { name, category, address, phone, email, workingHours, website, instagram, gallery } = req.body;

  if (name !== undefined) vendor.name = name;
  if (category !== undefined) vendor.category = category;
  if (address !== undefined) vendor.address = address;
  if (phone !== undefined) vendor.phone = phone;
  if (email !== undefined) vendor.email = email;
  if (workingHours !== undefined) vendor.workingHours = workingHours;
  if (website !== undefined) vendor.website = website;
  if (instagram !== undefined) vendor.instagram = instagram;
  if (gallery !== undefined) vendor.gallery = gallery;

  const updated = await vendor.save();
  res.json(updated);
};
