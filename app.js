const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();

const dbPath = path.join(__dirname, "moviesData.db");

let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error Message:${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();
app.get("/movies", async (request, response) => {
  const moviesQuery = `select * from Movie order by movie_id;`;
  const moviesList = await db.all(moviesQuery);
  response.send(moviesList);
});
