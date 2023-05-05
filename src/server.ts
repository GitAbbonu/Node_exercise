import express from "express";
import "express-async-errors";
import morgan from "morgan";
import multer from "multer";

import {
  getAll,
  getByID,
  create,
  updateByID,
  deleteByID,
  logIn,
  logOut,
} from "./controllers/user.js";
import authorize from "./authorize.js";
import "./passport.js";

const server = express();
const port = 5000;

server.use(morgan("dev"));
server.use(express.json());

server.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader("Access-Control-Allow-Credentials");

  // Pass to next layer of middleware
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

server.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome" });
});

server.get("/users", getAll);

server.get("/users/:id", getByID);

//SignUP
server.post("/users", create);

server.put("/users/:id", updateByID);

server.delete("/users/:id", deleteByID);

//LogIN
server.post("/users/login", logIn);
server.get("/users/logout", authorize, logOut);

server.listen(port);
