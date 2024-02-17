import  { useState, useEffect } from 'react';
import Meal from './Meal'
import { useLocation } from 'react-router-dom';

function MealsPreview() {
  const [meals, setMeals] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetch('/api/meals')
      .then(response => response.json())
      .then(data => setMeals(data))
      .catch(error => console.error('Error:', error));
  }, []); 

  return (
    <div className="meals-preview-list">
      {meals.map((meal, index) => {
    
        if (location.pathname === "/" && index >= 3) {
          return null; 
        }
        return <Meal key={meal.id} meal={meal} />;
      })}
    </div>
  );
}

export default MealsPreview;
