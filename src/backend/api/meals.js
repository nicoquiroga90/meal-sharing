const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  try {
    const allMeals = await knex("homework3.Meal").select("*");
    res.json(allMeals);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (req, res) => {
  const newMeal = req.body;
  try {
    await knex("homework3.Meal").insert(newMeal);
    res.status(201).send("Meal added to the database");
  } catch (error) {
    res.status(500).send("Error adding meal to the database");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params;
  try {
    const meal = await knex("homework3.Meal").where(id);
    if (!meal) {
      return res.status(404).send("Meal not found");
    }
    res.json(meal);
  } catch (error) {
    res.status(500).send("Error searching ID");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params;
  const updatedMeal = req.body;
  try {
    const updatedCount = await knex("homework3.Meal")
      .where(id)
      .update(updatedMeal);
    if (updatedCount === 0) {
      return res.status(404).send("Meal not found");
    }
    res.send("Meal updated");
  } catch (error) {
    res.status(500).send("Error updating meal");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params;
  try {
    const deletedCount = await knex("homework3.Meal").where(id).del();
    if (deletedCount === 0) {
      return res.status(404).send("Meal not found");
    }
    res.send("Meal deleted");
  } catch (error) {
    res.status(500).send("Error deleting meal");
  }
});

module.exports = router;
