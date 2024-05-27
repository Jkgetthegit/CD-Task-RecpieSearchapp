import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Random.css";

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

function Random() {
  const [random, setRandom] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    randomRecipe();
  }, []);

  const randomRecipe = async () => {
    const recipes: Recipe[] = [];
    try {
      for (let i = 0; i < 12; i++) {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && Array.isArray(data.meals)) {
          recipes.push(data.meals[0]);
        } else {
          throw new Error("Unexpected data format received from the API.");
        }
      }
      setRandom(recipes);
      setError(null);
      console.log("Random Recipe Function called");
    } catch (error: any) {
      console.error("Error fetching random recipes:", error);
      setRandom([]);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
      )}

      <h4 className="text-success fw-bolder ms-2 text-center">Some popular..</h4>
      {isLoading ? (
        //Loading spinner
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ marginTop: "8rem" }}
        >
          <div className="spinner-border  " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        //Random food slider
        <div className="slider-container">
          <Slider {...settings}>
            {random.map((recipe, index) => (
              <div key={index} className="card-container">
                <Link
                  to={`/recipedetails`}
                  state={{ recipe }}
                  style={{ textDecoration: "none" }}
                >
                  <div className="card rounded" style={{ width: "100%" }}>
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
            ))}
          </Slider>
        </div>
      )}
     
        <h3 className="text-center" style={{position:"absolute",bottom:"30px", left: "50%", transform: "translateX(-50%)" }}>Search <span className="text-success fw-bold">Recipe!</span> Serve <span className="text-success fw-bold">Happy !!</span></h3>
    </div>
  );
}

export default Random;
