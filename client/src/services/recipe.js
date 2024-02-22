import { NODE_BE_API as axios } from './axios';

export const getAllRecipes = () => {
  return axios.get(`/recipes/all`).then((res) => res.data);
};

export const getAllIngredients = () => {
  return axios.get(`/recipes/allIngredients`).then((res) => res.data);
};

export const insertRecipe = (body) => {
  return axios.post(`/recipes/insertRecipe`, body).then((res) => res.data);
};

export const editRecipeById = (id, body) => {
  return axios.post(`/recipes/editRecipe/${id}`, body).then((res) => res.data);
};

export const deleteRecipeById = (id) => {
  return axios.delete(`/recipes/deleteRecipe/${id}`).then((res) => res.data);
};
