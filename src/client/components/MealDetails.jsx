import { useState, useEffect } from 'react';
import ReservationForm from './ReservationForm';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList.jsx';
import '../styles/ReviewForm.css';

function MealDetails({ match }) {
  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const mealId = match.params.id;
    fetch(`/api/meals/${mealId}`)
      .then(response => response.json())
      .then(data => setMeal(data))
      .catch(error => console.error('Error:', error));

    fetch(`/api/reviews/${mealId}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [match.params.id]);

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="meal-details">
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <p>Price: ${meal.price}</p>

      {meal.max_reservations > 0 && (
        <div className="form-container">
          <ReservationForm mealId={meal.id} />
          <hr />
          <ReviewForm mealId={meal.id} mealTitle={meal.title} />
        </div>
      )}

      <ReviewList reviews={reviews} />
    </div>
  );
}

export default MealDetails;
