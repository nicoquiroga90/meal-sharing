import { useState, useEffect } from 'react';

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch('/api/meals') 
      .then(response => response.json())
      .then(data => setMeals(data))
      .catch(error => console.error('Error:', error));
  }, []); 

  return (
    <div>
      <h2>Meals List</h2>
      <ul>
        {meals.map(meal => (
          <li key={meal.id}>
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>Price: {meal.price}</p>
          </li>
        ))}
      </ul> 
    </div>
  );
};

export default MealsList;