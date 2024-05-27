import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchReceipes({ input } : any )   {
  interface Recipe {
    strMealThumb: string;
    strMeal: string;
    strArea: string;
    strInstructions: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;
    strIngredient17: string;
    strIngredient18: string;
    strIngredient19: string;
    strIngredient20: string;
    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    strMeasure16: string;
    strMeasure17: string;
    strMeasure18: string;
    strMeasure19: string;
    strMeasure20: string;
    strYoutube: string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    if (input) {
      showSearchRecipe();
    }
  }, [input]);

  const showSearchRecipe = async () => {
    try {
      const api = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
      );
      const fetchedData = await api.json();
      setRecipes(fetchedData.meals || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    finally{
      setIsLoading(false)
    }
  };

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber : number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h3 className="text-center">Search Result</h3>
      {isLoading ? (
        //Loading spinner
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: "5rem" }}
        >
          <div className="spinner-border  " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-center align-items-center flex-wrap px-5">
            {currentRecipes.length > 0 ? (
              currentRecipes.map((recipe, index) => (
                <div key={index} className="card-container">
                  <Link
                    to={`/recipedetails`}
                    state={{ recipe }}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card rounded" style={{ width: "18rem" }}>
                      <img
                        src={recipe.strMealThumb}
                        className="card-img-top"
                        alt={recipe.strMeal}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title text-truncate">
                          {recipe.strMeal}
                        </h5>
                        <p className="card-text">
                          <i>It's a {recipe.strArea} dish</i>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center fs-2 fw-bold text-capitalize mt-5">
                <span className="text-danger">OOPS!😑</span>No recipes found.
              </p>
            )}
          </div>
          <div className="mt-5">
            <ul className="pagination justify-content-center">
              {Array.from({
                length: Math.ceil(recipes.length / itemsPerPage),
              }).map((_, index) => (
                <li key={index} className="page-item">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`page-link ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchReceipes;
