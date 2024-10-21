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

module.exports = { checkForAuthenticationCookie };
