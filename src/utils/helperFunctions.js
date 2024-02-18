require('dotenv').config();

const { NODE_ENVS, UNAUTHORIZED } = require('./constants');
const configurations = require('../../config');

const getDynamicEnv = async (key) => {
  if (configurations.NODE_ENV === NODE_ENVS.development) {
    return key;
  } else {
  }
};

const isEmptyArray = (input = []) => {
  return Array.isArray(input) && input?.length > 0 ? false : true;
};

const handleServerError = (err, res) => {
  if (err.message === UNAUTHORIZED) {
    res.status(401).json({ msg: 'Unauthorized' });
  } else res.status(500).send('Server Error');
};

const formatGetAllRecipesArr = (rows) =>
  rows.reduce((acc, item) => {
    const existingEntry = acc.find((entry) => entry.recipeId === item.recipe_id);

    if (existingEntry) {
      existingEntry.ingredients.push({
        ingredient_id: item.ingredient_id,
        name: item.ingredient_name,
        quantity: item.quantity,
      });
    } else {
      acc.push({
        recipeId: item.recipe_id,
        recipeName: item.title,
        description: item.description,
        created_at: item.created_at,
        updated_at: item.updated_at,
        ingredients: item.ingredient_id && [
          {
            ingredient_id: item.ingredient_id,
            name: item.ingredient_name,
            quantity: item.quantity,
          },
        ],
      });
    }

    return acc;
  }, []);

module.exports = {
  isEmptyArray,
  getDynamicEnv,
  handleServerError,
  formatGetAllRecipesArr,
};
