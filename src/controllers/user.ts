import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import Joi from "joi";
import { db } from "./../db.js";
import jwt from "jsonwebtoken";

//CRUD
async function getAll(req: Request, res: Response) {
  const users = await db.many(`SELECT * FROM users;`);
  res.status(200).json(users);
}

async function getByID(req: Request, res: Response) {
  const { id } = req.params;

  const user = await db.oneOrNone(
    `SELECT * FROM users WHERE id=$1;`,
    Number(id)
  );

  res.status(200).json(user);
}

const userSchemaBody = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

async function create(req: Request, res: Response) {
  const { username, password } = req.body;

  const newuser = { username, password };

  const validation = userSchemaBody.validate(newuser);

  if (validation.error) {
    res.status(400).json({ msg: "error 400" });
  } else {
    await db.none(`INSERT INTO users (name,password) VALUES ($1,$2)`, [
      username,
      password,
    ]);

    res.status(200).json({ msg: "create new user" });
  }
}

async function updateByID(req: Request, res: Response) {
  const { id } = req.params;
  const { username, password } = req.body;

  await db.none(`UPDATE users SET name=$2,password=$3 WHERE id=$1`, [
    Number(id),
    username,
    password,
  ]);

  res.status(200).json({ msg: "updato" });
}

async function deleteByID(req: Request, res: Response) {
  const { id } = req.params;

  await db.none(`DELETE FROM users WHERE id=$1`, Number(id));

  res.status(200).json({ msg: "The user was deleted." });
}

async function logIn(req: Request, res: Response) {
  const { username, password } = req.body;

  const user = await db.one(`SELECT * FROM users WHERE username=$1`, username);

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    };

    const { SECRET = "" } = process.env;
    const token = jwt.sign(payload, SECRET);

    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);

    res.status(200).json({ id: user.id, username, token });
  } else {
    res.status(400).json({ msg: "username or password incorrect" });
  }
}

async function logOut(req: Request, res: Response) {
  try {
    const user: any = req.user;
    console.log(user);
    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [
      Number(user?.id),
      null,
    ]);
    res.status(200).json({ msg: "Logout success" });
  } catch (error) {
    console.error(error);
  }
}

export { getAll, getByID, create, updateByID, deleteByID, logIn, logOut };
