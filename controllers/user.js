const mongoose = require("mongoose");
const User = require("../models/user");

// Create User
async function handleSignupNewUser(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password)
      return res
        .status(400)
        .json({ status: "failed", message: "all fields required" });

    await User.create({ fullName, email, password });

    return res.status(201).json({
      status: "success",
      message: "user created successfully",
    });
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        status: "failed",
        message: "Email already exists. Please use a different email.",
      });
    }

    // Handle other errors
    return res.status(500).json({
      status: "failed",
      message: "Failed to register user",
      error: error.message,
    });
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
      return res
        .status(400)
        .json({ status: "failed", message: "all fields required" });
    }

    const { token, id } = await User.matchPasswordAndGenerateToken(
      email,
      password
    );

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
      email,
    });

    return res
      .status(201)
      .json({ status: "success", message: "update success" });
  } catch (error) {
    return res.json({ status: "failed", message: "failed update", error });
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
    const { _id, fullName, email, role } = await User.findById(id);

    return res
      .status(200)
      .json({ status: "success", user: { _id, fullName, email, role } });
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

async function handleDeleteUser(req, res) {
  if (!req.params.id)
    return res
      .status(400)
      .json({ status: "failed", message: "user not fount" });
  try {
    await User.findByIdAndDelete(req.params.id);

    return res
      .status(201)
      .json({ status: "success", message: "user delete success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "failed", message: "server error" });
  }
}

module.exports = {
  handleSignupNewUser,
  handleGetAllUser,
  handleLoginUser,
  handleLogoutUser,
  handleUpdateUser,
  handleGetSingleUser,
  handleDeleteUser,
};
