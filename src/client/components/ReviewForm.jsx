import React, { useState } from 'react';

function ReviewForm({ mealId, mealTitle }) {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: mealId,
          title: mealTitle,
          stars: rating,
          description: comment,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        alert("Thanks for your review!");
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Rating:
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      </label>
      <label>
        Comment:
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      </label>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
