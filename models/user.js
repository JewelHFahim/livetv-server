const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/athentication");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["editor", "admin"],
      default: "editor",
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Hasing Password
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;

  next();
});

// Matching LoginPassword and generating token
userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    try {
      const user = await this.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const salt = user.salt;
      const hashedPassword = user.password;

      const userProvidedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

      if (hashedPassword !== userProvidedPassword) {
        throw new Error("Password is incorrect");
      }

      const token = createTokenForUser(user);

      return token;
    } catch (error) {
      console.error("Error in matchPasswordAndGenerateToken:", error);
      throw error;
    }
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
