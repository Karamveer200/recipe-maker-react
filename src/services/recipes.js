const { MAPPER_NAMESPACES, QUERIES } = require('../utils/constants');
const { executeQuery } = require('../utils/database/database');

const insertNewRecipe = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.recipes, QUERIES.insertRecipe, params);

const insertNewIngredient = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.ingredients, QUERIES.insertIngredients, params);

const getAllRecipes = async () =>
  await executeQuery(MAPPER_NAMESPACES.recipes, QUERIES.selectAllRecipesWithIngredients);

const getAllIngredients = async () =>
  await executeQuery(MAPPER_NAMESPACES.ingredients, QUERIES.selectAllIngredients);

module.exports = {
  insertNewRecipe,
  insertNewIngredient,
  getAllRecipes,
  getAllIngredients,
};
