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
    .json({ status: "all users", total: users.length, users });
}

// Login User
async function handleLoginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ status: "all fields required" });
    }

    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res
      .cookie("token", token)
      .status(200)
      .json({ status: "login success" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(400).json({ error: "Invalid email or password" });
  }
}

// updated user
async function handleUpdateUser(req, res) {
  const { fullName, role, password, email } = req.body;

  try {
    await User.findByIdAndUpdate(req.params.id, {
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
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).json({ status: "success", user });
  } catch (error) {
    return res.json({ status: "failed", error });
  }
}

// Logout
async function handleLogoutUser(req, res) {
  return res
    .clearCookie("token")
    .status(200)
    .json({ status: "logout success" });
}

module.exports = {
  handleSignupNewUser,
  handleGetAllUser,
  handleLoginUser,
  handleLogoutUser,
  handleUpdateUser,
  handleGetSingleUser,
};
