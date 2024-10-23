const { validateToken } = require("../services/athentication");

function checkForAuthenticationCookie(tokenName) {
  return (req, res, next) => {
    // Headers Token
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }
    // Cookie Token
    const tokenValue = req?.cookies[tokenName] || authHeader.split(" ")[1];
    if (!tokenValue) return next();
    try {
      const user = validateToken(tokenValue);
      req.user = user;
    } catch (error) {
      return res.status(401).json({ status: "failed", message: "Invalid or expired token" });
    }
    next();
  };
}

function restricToUser(roles) {
  return function (req, res, next) {
    if (!req.user)
      return res
        .status(401)
        .json({ status: "failed", message: "Login required" });

    if (!roles.includes(req.user.role))
      return res
        .status(403)
        .json({ status: "failed", message: "Unauthorized access" });

    return next();
  };
}

module.exports = { checkForAuthenticationCookie, restricToUser };
