const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  try {
    let meals = knex("homework3.Meal");

    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir
    } = req.query;

    meals = maxPrice || maxPrice === "0" ? meals.where("price", "<", maxPrice) : meals;

    meals = availableReservations || availableReservations === "0"
      ? availableReservations === "true"
        ? meals.whereRaw("max_reservations > reservations")
        : availableReservations === "false"
          ? meals.whereRaw("max_reservations <= reservations")
          : (() => {
              res.send("Error checking available reservations");
              return meals;
            })()
      : meals;

    meals = title || title === "0" ? meals.where("title", "like", `%${title}%`) : meals;
    meals = dateAfter || dateAfter === "0" ? meals.where("when", ">", dateAfter) : meals;
    meals = dateBefore || dateBefore === "0" ? meals.where("when", "<", dateBefore) : meals;
    meals = limit || limit === "0" ? meals.limit(parseInt(limit)) : meals;
    
    meals = sortKey || sortKey === "0" ? meals.orderBy(sortKey, sortDir === "desc" ? "desc" : "asc") : meals;

    const result = await meals.select("*");
    res.json(result);
  } catch (error) {
    res.status(500).send("Error retrieving meals");
  }
});



router.get("/:meal_id/reviews", async (req, res) => {
  const { meal_id } = req.params;
  try {
    const reviews = await knex("homework3.Review")
      .where("meal_id", meal_id)
      .select("*");
    res.json(reviews);
  } catch (error) {
    res.status(500).send("Error consulting reviews");
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
