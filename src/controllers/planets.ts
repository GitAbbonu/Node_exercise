import { Request, Response } from "express";
import Joi from "joi";

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

//CRUD:
function getAll(req: Request, res: Response) {
  res.status(200).json(planets);
}

function getOneByID(req: Request, res: Response) {
  const { id } = req.params;

  const planet = planets.find((p) => p.id === Number(id));

  res.status(200).json(planet);
}

const schemaPlanet = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

function createP(req: Request, res: Response) {
  const { id, name }: Planet = req.body;

  const newPlanet: Planet = { id, name };

  const valid = schemaPlanet.validate(newPlanet);

  if (valid.error) {
    res.status(400).json("Errore");
  } else {
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "Pianeta creato" });
  }
}
function updateP(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;

  planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));

  res.status(200).json({ msg: "update" });
}
function deleteP(req: Request, res: Response) {
  const { id } = req.params;

  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "eliminato" });
}

export { getAll, getOneByID, createP, updateP, deleteP };
