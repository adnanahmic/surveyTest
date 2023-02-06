const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/auth", require("../routes/auth.route"));
apiRouter.use("/survey", require("../routes/survey.route"));

module.exports = apiRouter;
