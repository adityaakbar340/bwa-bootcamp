const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// Categories API
const categoriesRouter = require("./app/api/v1/categories/router.js");
const imagesRouter = require("./app/api/v1/images/router.js");
const talentsRouter = require('./app/api/v1/talents/router.js');
const eventsRouter = require('./app/api/v1/events/router.js');
const organizersRouter = require('./app/api/v1/organizers/router.js');
const authCMSRouter = require('./app/api/v1/auth/router.js');

const v1 = "/api/v1/cms";

const notFoundMiddleware = require("./app/middlewares/not-found");
const handleErrorMiddleware = require("./app/middlewares/handler-error");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to API!",
  });
});

app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);
app.use(v1, talentsRouter);
app.use(v1, eventsRouter);
app.use(v1, organizersRouter);
app.use(v1, authCMSRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
