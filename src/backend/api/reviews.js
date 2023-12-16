const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  try {
    const reviews = await knex("homework3.Review").select("*");
    res.json(reviews);
  } catch (error) {
    res.status(500).send("Error consulting reviews");
  }
});

router.post("/", async (req, res) => {
  const newReview = req.body;
  try {
    await knex("homework3.Review").insert(newReview);
    res.status(201).send("Review added");
  } catch (error) {
    res.status(500).send("Error adding review");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const review = await knex("homework3.Review")
      .where("id", id)
      .select("*")
      .first();
    if (!review) {
      return res.status(404).send("Review not found");
    }
    res.json(review);
  } catch (error) {
    res.status(500).send("Error in review");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedReview = req.body;
  try {
    const updatedCount = await knex("reviews")
      .where("id", id)
      .update(updatedReview);
    if (updatedCount === 0) {
      return res.status(404).send("Review not found");
    }
    res.send("Review updated");
  } catch (error) {
    res.status(500).send("Error updating review");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await knex("reviews").where("id", id).del();
    if (deletedCount === 0) {
      return res.status(404).send("Review not found");
    }
    res.send("Review deleted");
  } catch (error) {
    res.status(500).send("Error deleting review");
  }
});

module.exports = router;
