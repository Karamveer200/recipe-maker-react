import TextInput from '../../Common/Inputs/TextInput';
import { useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { IconButton } from '@mui/material';

const RecipeAdd = () => {
  const FORM_KEYS = {
    RECIPE_NAME: 'recipeName',
    INGREDIENTS: 'ingredients'
  };

  const newIngredientTemplate = { name: '', quantity: '' };

  const [formData, setFormData] = useState({
    [FORM_KEYS.RECIPE_NAME]: '',
    [FORM_KEYS.INGREDIENTS]: [newIngredientTemplate]
  });

  const onFormChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onIngredientChange = (e, index, key) => {
    const modifyCurrentIngredient = formData?.[FORM_KEYS.INGREDIENTS]?.map((item, itemIndex) => {
      if (index === itemIndex) {
        return { ...item, [key]: e.target.value };
      }

      return item;
    });

    setFormData((prev) => ({ ...prev, [e.target.name]: modifyCurrentIngredient }));
  };

  const onAddNewIngredient = () =>
    setFormData((prev) => ({
      ...prev,
      [FORM_KEYS.INGREDIENTS]: [...prev[FORM_KEYS.INGREDIENTS], newIngredientTemplate]
    }));

  const renderAddNewIngredientBtn = () => (
    <IconButton
      variant="contained"
      sx={{ marginTop: '8px', backgroundColor: '#fff', width: '0px', height: '0px' }}
      onClick={onAddNewIngredient}>
      <AddCircleRoundedIcon
        sx={{
          width: '35px',
          height: '35px',
          '&>path': {
            fill: '#4f46e5'
          }
        }}
      />
    </IconButton>
  );

  console.log('formData', formData);
  return (
    <div className="bg-indigo-100 rounded-lg h-full">
      <div className="bg-indigo-500 h-[45px] w-full rounded-md text-white font-semibold text-lg px-[20px] flex items-center">
        Add New Recipe
      </div>
      <div className="w-full p-[20px] flex flex-col gap-[30px]">
        <TextInput
          label="Enter Recipe name -"
          onChange={onFormChange}
          value={formData?.[FORM_KEYS.RECIPE_NAME]}
          name={FORM_KEYS.RECIPE_NAME}
          placeholder="Ex - Chipotle Burger"
        />

        <div className="flex flex-col gap-[8px]">
          <label className="block text-base font-semibold leading-6 pinkWhiteText MontserratFamily">
            Ingredients -
          </label>
          <div
            className="grid gap-[10px]"
            style={{
              gridTemplateColumns: '3fr 2fr'
            }}>
            <div className="flex flex-col">
              <div className="text-base font-medium">Name</div>
              <div className="flex flex-col gap-[5px]">
                {formData?.[FORM_KEYS.INGREDIENTS]?.map((item, index) => (
                  <TextInput
                    key={index}
                    onChange={(e) => onIngredientChange(e, index, 'name')}
                    value={item.name}
                    name={FORM_KEYS.INGREDIENTS}
                    placeholder="Ex - Lettuce"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-base font-medium">Quantity</div>
              <div className="flex flex-col gap-[5px]">
                {formData?.[FORM_KEYS.INGREDIENTS]?.map((item, index) => (
                  <div className="flex gap-[15px] items-center justify-between" key={index}>
                    <TextInput
                      onChange={(e) => onIngredientChange(e, index, 'quantity')}
                      value={item.quantity}
                      name={FORM_KEYS.INGREDIENTS}
                      placeholder="Ex - 100 gram"
                    />
                    {index === formData?.[FORM_KEYS.INGREDIENTS]?.length - 1 &&
                      renderAddNewIngredientBtn()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeAdd;
