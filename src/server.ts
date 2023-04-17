import express from "express";
import "express-async-errors";
import morgan from "morgan";
import {
  getAll,
  getOneByID,
  createP,
  updateP,
  deleteP,
} from "./controllers/planets";

const server = express();
const port = 3000;

server.use(morgan("dev"));
server.use(express.json());

server.listen(port);

server.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome" });
});

server.get("/planets", getAll);

server.get("/planets/:id", getOneByID);

server.post("/planets", createP);

server.put("/planets/:id", updateP);

server.delete("/planets/:id", deleteP);
