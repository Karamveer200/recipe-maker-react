const { check, validationResult } = require('express-validator');
const { insertNewRecipe } = require('../services/recipes');

const express = require('express');
const router = express.Router();

router.post(
  '/insertRecipe',
  [
    check('recipeName', 'recipeName is required').not().isEmpty(),
    check('description', 'description is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { recipeName, description } = req.body;

      const result = await insertNewRecipe({ title: recipeName, description });
      const recipeId = result.rows[0].recipe_id;

      res.send('Success');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
