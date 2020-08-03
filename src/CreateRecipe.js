import React, { useState } from "react";
import RecipeDataService from "./services/RecipeService";

function CreateRecipe(props) {
    const initialRecipeState = {
        id: null,
        name: "",
        description: "",
        ingredients: []
    };
    const [recipe, setRecipe] = useState(initialRecipeState);

    const saveRecipe = () => {
        var data = {
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients
        };

        RecipeDataService.create(data)
            .then(response => {
                setRecipe({
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    ingredients: response.data.ingredients
                });
                props.history.push("/recipe");
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const addInputField = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { name: "" }] });
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (index, newName) => {        
        const updatedIngredients = recipe.ingredients.map((ingredient, i) => {
        if (index === i) 
            return { name: newName };
        else 
            return { name: ingredient.name };
        });
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const deleteIngredientField = (index) => {
        let reaminingIngredients = recipe.ingredients.filter((e,i) => index !== i);

        setRecipe({ ...recipe, ingredients: reaminingIngredients });
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={recipe.name}
                    onChange={handleInputChange}
                    name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={recipe.description}
                    onChange={handleInputChange}
                    name="description"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label> <button className="btn btn-outline-secondary" onClick={addInputField}>+</button>
                    {recipe.ingredients.map((ingredient, index) => {
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

                <button onClick={saveRecipe}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CreateRecipe;