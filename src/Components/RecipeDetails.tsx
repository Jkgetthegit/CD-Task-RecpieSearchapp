import{ useState } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeDetails() {
  const [isIngredients, setIsIngredients] = useState(true);
  const location = useLocation();
  const { recipe } = location.state || {};
  // console.log(recipe);

  //pagination logic
  const getIngredientsAndMeasurements = (recipe : any ) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim() && measure && measure.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  const ingredientsAndMeasurements = getIngredientsAndMeasurements(recipe);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 " style={{backgroundColor: "#cccccc"}}>
      <h3 className="fw-bold">Here is Your <span className="text-success">Result !!</span></h3>
      <div className="card mb-3  shadow-lg" style={{ maxWidth: "80rem" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={recipe.strMealThumb}
              className="img-fluid rounded-start"
              alt={recipe.strMeal}
              style={{height:"100%" , objectFit :"cover"}}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title fw-bold text-uppercase text-success">{recipe.strMeal}</h2>
              <div className="mt-4">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setIsIngredients(true)}
                >
                  Ingredients
                </button>
                <button
                  className="btn btn-success me-2"
                  onClick={() => setIsIngredients(false)}
                >
                  Instructions
                </button>
                <a href={recipe.strYoutube} className="btn btn-danger">Watch video</a>
              </div>
              <div className="mt-5">
                {isIngredients ? (
                  <ul>
                    {ingredientsAndMeasurements.map((item, index) => (
                      <li key={index}>
                        {item.measure} {item.ingredient}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{recipe.strInstructions}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
