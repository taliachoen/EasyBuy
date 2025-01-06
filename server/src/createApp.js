const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/users.router.js");
const cors = require("cors");
const connectToDb = require("./utils/connectTodb.js");
// Middlewares Routes

exports.createApp = function () {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:5173"],
      optionsSuccessStatus: 200,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/users", usersRouter);

  return app;
};

exports.createAppE2E = function () {
  const app = express();

  connectToDb();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/users", usersRouter);

  return app;
};
