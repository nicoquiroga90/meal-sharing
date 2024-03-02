const express = require("express");
const router = express.Router();
const knex = require("../database");

router.post("/", async (req, res) => {
    const newReservation = req.body;
     newReservation.created_date = new Date();
    try {
      await knex("reservations").insert(newReservation);
      res.status(201).json("Reservation created successfully")
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error creating reservation" });
    }

  });



  router.get("/:id", async (req, res) => {

    try {
      const { id } = req.params;
      const reservations = await knex("reservations").select("*").where({ id }).first();
      if (reservations) {
        res.json(reservations);
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error retrieving reservation" });
    }
  });

module.exports = router;
