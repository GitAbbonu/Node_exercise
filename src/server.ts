import express from "express";
import "express-async-errors";
import morgan from "morgan";
import { getAll } from "./controllers/planets";

const server = express();
const port = 3000;

server.use(morgan("dev"));
server.use(express.json());

server.listen(port);

server.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome" });
});

server.get("/planets", getAll);
