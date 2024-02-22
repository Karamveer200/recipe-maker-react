const configurations = require('../../config');

const ARRAY_KEYS = {
  LABEL: 'LABEL',
  VALUE: 'VALUE',
  COMPONENT: 'COMPONENT',
  DATA: 'DATA',
  VALIDATION: 'VALIDATION',
};

const NODE_ENVS = {
  development: 'development',
  production: 'production',
  testing: 'testing',
};

const MAPPER_NAMESPACES = {
  recipes: 'recipes',
  ingredients: 'ingredients',
};

const QUERIES = {
  insertRecipe: 'insertRecipe',
  updateRecipeById: 'updateRecipeById',
  insertIngredients: 'insertIngredients',
  selectAllRecipesWithIngredients: 'selectAllRecipesWithIngredients',
  selectAllIngredients: 'selectAllIngredients',
  deleteIngredientsByIds: 'deleteIngredientsById',
  deleteRecipeById: 'deleteRecipeById',
};

module.exports = {
  ARRAY_KEYS,
  NODE_ENVS,
  MAPPER_NAMESPACES,
  QUERIES,
};
