const mongoose = require("mongoose");
const User = require("../models/user");

// Create User
async function handleSignupNewUser(req, res) {
  const { fullName, email, role, password } = req.body;

  try {
    if (!fullName || !email || !role || !password)
      return res.status(400).json({ status: "all fields required" });

    const user = await User.create({ fullName, email, role, password });

    return res
      .status(201)
      .json({ status: "user created successfully", id: user._id });
  } catch (error) {
    return res.json({ error });
  }
}

// Get All Users
async function handleGetAllUser(req, res) {
  const users = await User.find({});

  return res
    .status(200)
    .json({ status: "success", total: users.length, users });
}

// Login User
async function handleLoginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ status: "all fields required" });
    }

    const token = await User.matchPasswordAndGenerateToken(email, password);
    const id = await req.user?._id;


    return res
      .cookie("token", token)
      .status(200)
      .json({ status: "success", message: "login success", token, id });
  } catch (error) {
    console.log("Error:", error);
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid email or password" });
  }
}


// ADMIN ROUTES

// updated user
async function handleUpdateUser(req, res) {
  const { fullName, role, password, email } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "failed", message: "Invalid ID format" });
  }

  try {
    await User.findByIdAndUpdate(id, {
      fullName,
      role,
      password,
      email,
    });

    return res.status(201).json({ status: "update success" });
  } catch (error) {
    return res.json({ status: "failed update", error });
  }
}

// Get single user
async function handleGetSingleUser(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .send({ status: "failed", message: "Invalid ID format" });
  }
  try {
    const user = await User.findById(id);

    return res.status(200).json({ status: "success", user });
  } catch (error) {
    return res.json({ status: "failed", error });
  }
}


// Logout User
async function handleLogoutUser(req, res) {
  try {
    // Clear the 'token' cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only send cookies over HTTPS in production
      sameSite: "strict", // prevent CSRF attacks by only allowing cookies from the same site
    });

    return res
      .status(200)
      .json({ status: "success", message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ status: "failed", message: "Logout failed" });
  }
}

module.exports = {
  handleSignupNewUser,
  handleGetAllUser,
  handleLoginUser,
  handleLogoutUser,
  handleUpdateUser,
  handleGetSingleUser,
};
