require('dotenv').config();

const getDynamicEnv = async (key) => {
  return key;
};

const isEmptyArray = (input = []) => {
  return Array.isArray(input) && input?.length > 0 ? false : true;
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

const formatGetAllIngredientsNamesArr = (rows) => rows.map((item) => ({ label: item.name, value: item.name }));

const formatGetAllIngredientsQuantitiesArr = (rows) =>
  rows.map((item) => ({ label: item.quantity, value: item.quantity }));

module.exports = {
  isEmptyArray,
  getDynamicEnv,
  formatGetAllRecipesArr,
  formatGetAllIngredientsNamesArr,
  formatGetAllIngredientsQuantitiesArr,
};
