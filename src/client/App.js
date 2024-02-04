import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from './components/TestComponent/MealsList';

function App() {
  return (
    <Router>
      <Route exact path="/">

      </Route>
      <Route exact path="/meals">
        <MealsList />
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
