import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeDataService from "./services/RecipeService";

import CreateRecipe from "./CreateRecipe";
import Recipe from "./Recipe";
import RecipeList from "./RecipeList";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchName, setSearchName] = useState("");

  const onChangeSearchName = event => {
      const searchName = event.target.value;
      setSearchName(searchName);
  };

  const findByName = () => {
      RecipeDataService.findByName(searchName)
      .then(response => {
          setRecipes(response.data);
          console.log(response.data);
      })
      .catch(erorr => {
          console.log(erorr);
      });
  };
  return (
    <Router>
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <a href="/recipe" className="navbar-brand">
              Recipe App
            </a>
            <div className="col-md-8">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByName}
                      >
                        Search
                      </button>
                    </div>
                </div>
            </div>
              <div className="navbar-nav">
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    <button className="btn btn-outline-secondary" type="button" >
                        Create
                      </button>
                  </Link>
                </li>
              </div>
          </nav>
  
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/recipe"]} render={() => <RecipeList recipes={recipes} setRecipes={setRecipes} />} />
              <Route exact path="/add" component={CreateRecipe} />
              <Route path="/recipe/:id" component={Recipe} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
