import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MealsList from "./components/MealsList";
import MealDetails from "./components/MealDetails";
import Header from "./components/Header";
import MealsPreview from "./components/MealsPreview";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="home-page">
            <h1>Meal Sharing App</h1>
            <div className="meals-preview">
              <h3>Some of Our Meals:</h3>
              <MealsPreview />
            </div>
            <Link to="/meals" className="see-more-link">
              See More
            </Link>
          </div>
        </Route>
        <Route exact path="/meals" component={MealsList} />
        <Route path="/meals/:id" component={MealDetails} />
      </Switch>
    </Router>
  );
}

export default App;
