const db = require("../models/index");
const Admin = db.admin;
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const messageConstants = require("../constant/message");

const authenticateJWT = (req, res, next) => {
  const url = req.url;
  const register = url.includes("/auth/registration");
  const login = url.includes("/auth/login");
  const userSubmit = url.includes("/submit");
  const user = url.includes("/:id/registor/user");

  if ((register || login || user || userSubmit) === true) {
    next();
  } else {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          return res.status(httpStatus.FORBIDDEN).json({
            status: httpStatus.FORBIDDEN,
            message: messageConstants.TOKEN_EXPIRE,
          });
        }
        if (payload) {
          await Admin.findOne({
            where: { id: payload.admin_id },
          });
          next();
        } else {
          res.status(httpStatus.FORBIDDEN).json({
            status: httpStatus.UNAUTHORIZED,
            message: messageConstants.USER_NOT_FOUND,
          });
        }
      });
    } else {
      return res.send({
        status: httpStatus.UNAUTHORIZED,
        message: messageConstants.ADMIN_UNAUTHORIZED,
      });
    }
  }
};

module.exports = authenticateJWT;
