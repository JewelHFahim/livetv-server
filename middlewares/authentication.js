const { validateToken } = require("../services/athentication");

function checkForAuthenticationCookie(tokenName) {
  return (req, res, next) => {
    const tokenValue = req?.cookies[tokenName];

    if (!tokenValue) return next();

    try {
      const user = validateToken(tokenValue);

      req.user = user;
    } catch (error) {
      console.log("Error", error);
    }

    next();
  };
}

function restricToUser(roles) {
  return function (req, res, next) {
    if (!req.user) return res.json({status: "login required"});

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}

module.exports = { checkForAuthenticationCookie, restricToUser };
