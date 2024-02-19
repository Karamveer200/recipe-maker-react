const { check, validationResult } = require('express-validator');
const { insertNewRecipe, insertNewIngredient, getAllRecipes, getAllIngredients } = require('../services/recipes');
const {
  formatGetAllRecipesArr,
  formatGetAllIngredientsNamesArr,
  formatGetAllIngredientsQuantitiesArr,
} = require('../utils/helperFunctions');
const express = require('express');
const router = express.Router();

router.post(
  '/insertRecipe',
  [
    check('recipeName', 'recipeName is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
    check('ingredients', 'ingredients are required').isArray().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { recipeName, description, ingredients } = req.body;

      const result = await insertNewRecipe({ title: recipeName, description });
      const recipeId = result.rows[0].recipe_id;
      await insertNewIngredient({ recipe_id: recipeId, ingredients });

      res.send('Success');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/all', async (req, res) => {
  try {
    const result = await getAllRecipes();
    const rows = result?.rows;

    res.send(formatGetAllRecipesArr(rows));
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/allIngredients', async (req, res) => {
  try {
    const result = await getAllIngredients();
    const rows = result?.rows;

    res.send({
      nameOptions: formatGetAllIngredientsNamesArr(rows),
      quantityOptions: formatGetAllIngredientsQuantitiesArr(rows),
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
