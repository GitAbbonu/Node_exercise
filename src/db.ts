//postgres://username:password
import pgPromise from "pg-promise";
const db = pgPromise()("postgres://postgres:root@localhost:5432/postgres");

const setupDB = async () => {
  await db.none(`

    DROP TABLE IF EXISTS users CASCADE;

    CREATE TABLE users (
      id SERIAL NOT NULL PRIMARY KEY,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      token TEXT
    );
  `);

  await db.none(
    `INSERT INTO users (username,password) VALUES ('dummy','dummy')`
  );
};

setupDB();

export { db };
