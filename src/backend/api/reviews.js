const express = require("express");
const router = express.Router();
const knex = require("../database");

router.post("/", async (req, res) => {
    const newReview = req.body;
     newReview.created_date = new Date();
    try {
      await knex("reviews").insert(newReview);
      res.status(200).json("Reservation created successfully")
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error creating reservation" });
    }

  });

  router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await knex("reviews").where({ meal_id: id });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;
