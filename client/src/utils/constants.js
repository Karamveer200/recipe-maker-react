import * as Yup from 'yup';

export const LOCAL_STORAGE_KEYS = {
  RECIPES: 'RECIPES'
};

export const RECIPE_FORM_KEYS = {
  RECIPE_NAME: 'recipeName',
  RECIPE_ID: 'recipeId',
  INGREDIENTS: 'ingredients',
  DESCRIPTION: 'description',
  NAME: 'name',
  QUANTITY: 'quantity',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at'
};

export const ARRAY_KEYS = {
  LABEL: 'LABEL',
  VALUE: 'VALUE',
  COMPONENT: 'COMPONENT',
  DATA: 'DATA',
  ON_CLICK: 'ON_CLICK',
  HEADER: 'HEADER',
  BODY: 'BODY',
  DISPLAY_FN: 'DISPLAY_FN',
  MIN_WIDTH: 'MIN_WIDTH',
  MAX_WIDTH: 'MAX_WIDTH'
};

export const RECIPE_ADD_VALIDATION = Yup.object().shape({
  [RECIPE_FORM_KEYS.RECIPE_NAME]: Yup.string().required('Recipe name is required'),
  [RECIPE_FORM_KEYS.DESCRIPTION]: Yup.string().required('Description is required'),
  [RECIPE_FORM_KEYS.INGREDIENTS]: Yup.array()
    .of(Yup.object())
    .min(1, 'At least one ingredient is required')
    .test('is-ingredient-name', 'Name and quantity are required', (ingredients) => {
      const failedIndices = ingredients
        .map((item, index) =>
          !item[RECIPE_FORM_KEYS.NAME] || !item[RECIPE_FORM_KEYS.QUANTITY] ? index : null
        )
        .filter((index) => index !== null);

      if (failedIndices.length > 0) {
        const stringifyArr = JSON.stringify(failedIndices);
        return new Yup.ValidationError(stringifyArr, null, RECIPE_FORM_KEYS.INGREDIENTS);
      }

      return true;
    })
});
