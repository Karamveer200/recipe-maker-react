const { MAPPER_NAMESPACES, QUERIES } = require('../utils/constants');
const { executeQuery } = require('../utils/database/database');

const insertNewRecipe = async (params) =>
  await executeQuery(MAPPER_NAMESPACES.recipes, QUERIES.insertRecipe, params);

module.exports = {
  insertNewRecipe,
};
