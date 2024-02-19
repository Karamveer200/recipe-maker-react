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
