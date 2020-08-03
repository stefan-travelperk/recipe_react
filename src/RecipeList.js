import React, { useState, useEffect } from "react";
import RecipeDataService from "./services/RecipeService";
import { Link } from "react-router-dom";

function RecipeList({recipes, setRecipes}) {
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        retrieveRecipes();
    }, []);

    const retrieveRecipes = () => {
        RecipeDataService.getAll()
        .then(response => {
            setRecipes(response.data);
            console.log(response.data);
            if(response.data.length > 0) {
                setCurrentRecipe(response.data[0]);
                setCurrentIndex(0);
            }
        })
        .catch(erorr => {
            console.log(erorr);
        });
    };

    const setActiveRecipe = (recipe, index) => {
        setCurrentRecipe(recipe);
        setCurrentIndex(index);
    };

    const deleteRecipe = (id) => {
      RecipeDataService.remove(id)
        .then(response => {
          console.log(response.data);
          retrieveRecipes();
        })
        .catch(error => {
          console.log(error);
        });
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <div>
                    <h4>Recipes List</h4>
                </div>

                <ul className="list-group">
                {recipes &&
                    recipes.map((recipe, index) => (
                    <li
                        className={
                        "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveRecipe(recipe, index)}
                        key={index}
                        style={{display: 'flex', justifyContent: 'space-between'}}
                    >
                        {recipe.name}
                        <Link to='' style={{color: 'red'}} onClick={() => deleteRecipe(recipe.id)}>
                                Remove
                        </Link>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentRecipe ? (
                <div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h4>Recipe</h4>

                        <Link to={"/recipe/" + currentRecipe.id} >
                            <button className="btn btn-outline-secondary" type="button" >
                                Edit
                            </button>
                        </Link>
                    </div>
                    <div>
                    <label>
                        <strong>Name:</strong>
                    </label>{" "}
                    {currentRecipe.name}
                    </div>
                    <div>
                    <label>
                        <strong>Description:</strong>
                    </label>{" "}
                    {currentRecipe.description}
                    </div>
                    <div>
                    <label>
                        <strong>Ingredients:</strong>
                    </label>
                    <ul>
                        {currentRecipe.ingredients && currentRecipe.ingredients.map((ingredient,ind) => 
                            <li key={ind}>{ingredient.name}</li>
                        )}
                    </ul>
                    </div>
                </div>
                ) : (
                    <div>
                        <br />
                        <p>Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeList;