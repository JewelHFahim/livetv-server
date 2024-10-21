const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "Epick@1234$";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, SECRET);

  return token;
}

function validateToken(token) {
  if (!token) return null;

  const payload = jwt.verify(token, SECRET);

  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
