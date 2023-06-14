const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }
};
