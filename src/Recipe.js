import React, { useState, useEffect } from "react";
import RecipeDataService from "./services/RecipeService";

function Recipe(props) {
  const initialRecipeState = {
    id: null,
    name: "",
    description: "",
    ingredients: []
  };

  const [currentRecipe, setCurrentRecipe] = useState(initialRecipeState);
  const [message, setMessage] = useState("");

  const getRecipe = id => {
    RecipeDataService.get(id)
      .then(response => {
        setCurrentRecipe(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecipe(props.match.params.id);
  }, [props.match.params.id]);

  const updateRecipe = () => {
    RecipeDataService.update(currentRecipe.id, currentRecipe)
      .then(response => {
        console.log(response.data);
        setMessage("The recipe was updated successfully!");
        props.history.push("/recipe");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleBack = () => {
    props.history.push("/recipe");
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentRecipe({ ...currentRecipe, [name]: value });
  };

  const handleIngredientChange = (index, newName) => {    
    const updatedIngredients = currentRecipe.ingredients.map((ingredient, i) => {
      if (index === i) 
        return { name: newName };
      else 
        return { name: ingredient.name };
    });
    setCurrentRecipe({ ...currentRecipe, ingredients: updatedIngredients });
  };

  const deleteIngredientField = (index) => {
      let reaminingIngredients = currentRecipe.ingredients.filter((e,i) => index !== i);

      setCurrentRecipe({ ...currentRecipe, ingredients: reaminingIngredients });
  }

  const addInputField = (e) => {
      e.preventDefault();
      setCurrentRecipe({ ...currentRecipe, ingredients: [...currentRecipe.ingredients, { name: "" }] });
  }

  return (
        <div>
            {currentRecipe ? (
                <div className="edit-form">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h4>Recipe</h4>
                        <button className="btn btn-outline-secondary" onClick={handleBack}>Back</button>
                    </div>
                    <form>
                        <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={currentRecipe.name}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={currentRecipe.description}
                            onChange={handleInputChange}
                        />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ingredients">Ingredients</label> <button className="btn btn-outline-secondary" onClick={addInputField}>+</button>
                                {currentRecipe.ingredients.map((ingredient, index) => {
                                    return (
                                        <div key={index}> 
                                            <br  />
                                            <input
                                            value={ingredient.name}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            />
                                            <button className="btn btn-outline-secondary" onClick={() => deleteIngredientField(index)}>x</button>
                                        </div>
                                    );
                                })}
                        </div>
                    </form>

                    <button className="btn btn-outline-secondary" type="submit" onClick={updateRecipe}>
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Recipe...</p>
                </div>
            )}
        </div>
    );
};

export default Recipe;