import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import RecipeDetails from "./Components/RecipeDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipedetails" element={<RecipeDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
