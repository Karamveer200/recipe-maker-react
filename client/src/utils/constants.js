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
});

export const LOCAL_INGREDIENT_NAMES = [
  { value: 'Tomato', label: 'Tomato' },
  { value: 'Chicken', label: 'Chicken' },
  { value: 'Garlic', label: 'Garlic' },
  { value: 'Onion', label: 'Onion' },
  { value: 'Cheese', label: 'Cheese' }
];

export const LOCAL_INGREDIENT_QUANTITIES = [
  { value: '5g', label: '5g' },
  { value: '10g', label: '10g' },
  { value: '50g', label: '50g' },
  { value: '150g', label: '150g' },
  { value: '200g', label: '200g' }
];
