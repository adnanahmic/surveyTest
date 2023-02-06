require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const authenticateJWT = require("./src/middleware/middleware");
const errorHandler = require("./src/error/error");
const apiRouter = require("./src/routes");

const corsConfig = {
  origin: "*",
  method: "GET, POST, PUT, PATCH, DELETE, HEAD",
  credential: true,
  exposeHeader: ["x-auth-token"],
};
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(authenticateJWT);
app.use("/", apiRouter);
app.use(errorHandler.converter);
app.use(errorHandler.notFound);
app.use(errorHandler.handler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
