const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  try {
    const allMeals = await knex("homework3.Reservation").select("*");
    res.json(allMeals);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params;
  try {
    const reservation = await knex("homework3.Reservation").where(id);
    if (!reservation) {
      return res.status(404).send("Reservation not found");
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).send("Error fetching reservation by ID");
  }
});

router.post("/", async (req, res) => {
  const newReservation = req.body;
  try {
    await knex("homework3.Reservation").insert(newReservation);
    res.status(201).send("Reservation added to the database");
  } catch (error) {
    res.status(500).send("Error adding reservation to the database");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params;
  const updatedReservation = req.body;
  try {
    const updatedCount = await knex("homework3.Reservation")
      .where(id)
      .update(updatedReservation);
    if (updatedCount === 0) {
      return res.status(404).send("Reservation not found");
    }
    res.send("Reservation updated");
  } catch (error) {
    res.status(500).send("Error updating reservation");
  }
});

router.delete("/:id", async (req, res) => {
  const id= req.params;
  try {
    const deletedCount = await knex("homework3.Reservation").where(id).del();
    if (deletedCount === 0) {
      return res.status(404).send("Reservation not found");
    }
    res.send("Reservation deleted");
  } catch (error) {
    res.status(500).json("Error deleting reservation");
  }
});

module.exports = router;
