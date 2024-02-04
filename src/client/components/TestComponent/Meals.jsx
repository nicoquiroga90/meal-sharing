import "../../styles/MealsList.css";

const Meal = ({ meal }) => {
  const formattedPrice =
    typeof meal.price === "string" ? parseFloat(meal.price) : meal.price;

  return (
    <div className="meal-card">
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>

      <p>Price: ${formattedPrice.toFixed(2)}</p>
    </div>
  );
};

export default Meal;
