const axios = require("axios");


const getAll = () => {
    console.log("List all recipes");
    return axios.get("/api/recipe/recipe/");
};

const get = id => {
    console.log("Get recipe by id");
    return axios.get(`/api/recipe/recipe/${id}`);
};

const create = data => {
    console.log("Create recipe");
    return axios.post("/api/recipe/recipe/", data);
};

const update = (id, data) => {
    console.log("Update recipe");
    return axios.patch(`/api/recipe/recipe/${id}/`, data);
};

const remove = id => {
    console.log("Remove recipe");
    return axios.delete(`/api/recipe/recipe/${id}`);
};

const findByName = name => {
    console.log("Find recipes by name");
    return axios.get(`/api/recipe/recipe?name=${name}`);
};

export default { getAll, get, create, update, remove, findByName };