const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const meals = await knex("homework3.Meal").select("*");
    response.json(meals);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (req, res) => {
  try {
    const mealId = req.params.id;
    const meal = await knex("homework3.Meal").where({ id: mealId }).first();
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.json(meal);
  } catch (error) {
    throw error;
  }
});

module.exports = router;
