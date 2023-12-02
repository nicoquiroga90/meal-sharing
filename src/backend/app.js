const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const buildPath = path.join(__dirname, "../../public"); //I changed /dist for /public, because if was give me a directory error
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);

// Homework NJS Week 1

app.get("/future-meals", async (req, res) => {
  const futureMeals = await knex("homework3.Meal").where(
    "when",
    ">",
    knex.raw("NOW()")
  );
  res.json(futureMeals || []);
});

app.get("/past-meals", async (req, res) => {
  const pastMeals = await knex("homework3.Meal").where('when', '<', knex.raw('NOW()'));
  res.json(pastMeals);
});

app.get("/all-meals", async (req, res) => {
  const allMeals = await knex("homework3.Meal").select("*");
  res.json(allMeals);
});

app.get("/first-meal", async (req, res) => {
  const firstMeal = await knex("homework3.Meal").orderBy("id").first();
  if (firstMeal) {
    res.json(firstMeal);
  } else {
    res.status(404).json({ message: "No meals found" });
  }
});

app.get("/last-meal", async (req, res) => {
  const lastMeal = await knex("homework3.Meal").orderBy("id", "desc").first();
  if (lastMeal) {
    res.json(lastMeal);
  } else {
    res.status(404).json({ message: "No meals found" });
  }
});

const knex = require("./database");
app.listen(3000, () => console.log("ok PORT 3000"));

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file";
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
