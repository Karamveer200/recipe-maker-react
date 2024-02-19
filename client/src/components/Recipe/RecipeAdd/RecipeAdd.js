import TextInput from '../../Common/Inputs/TextInput';
import CustomAutoComplete from '../../Common/Inputs/AutoComplete';
import { useState, useEffect } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { IconButton } from '@mui/material';
import {
  RECIPE_FORM_KEYS,
  LOCAL_INGREDIENT_QUANTITIES,
  LOCAL_INGREDIENT_NAMES
} from '../../../utils/constants';
import { Scrollbar } from 'react-scrollbars-custom';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { Button } from '@mui/material';
import Spinner from '../../Common/Spinner/Spinner';
import CustomTooltip from '../../Common/Tooltip/ToolTip';

const RecipeAdd = ({
  values,
  errors,
  touched,
  setFieldValue,
  submitForm,
  isInsertNewRecipeLoading,
  allIngredients
}) => {
  const [localIngredientName, setLocalIngredientName] = useState('');
  const [localIngredientQuantity, setLocalIngredientQuantity] = useState('');
  const [localIngredientError, setLocalIngredientError] = useState({
    showError: false,
    nameActive: false,
    quantityActive: false,
    text: null
  });

  useEffect(() => {
    const nameLen = localIngredientName?.length;
    const quantityLen = localIngredientQuantity?.length;

    if (!nameLen && !quantityLen) {
      setLocalIngredientError((prev) => ({
        ...prev,
        text: 'Both Name and Quantity are required',
        nameActive: true,
        quantityActive: true
      }));
    } else if (!nameLen) {
      setLocalIngredientError((prev) => ({
        ...prev,
        text: 'Name is required',
        nameActive: true,
        quantityActive: false
      }));
    } else if (!quantityLen) {
      setLocalIngredientError((prev) => ({
        ...prev,
        text: 'Quantity is required',
        nameActive: false,
        quantityActive: true
      }));
    } else if (quantityLen && nameLen) {
      setLocalIngredientError({
        showError: false,
        nameActive: false,
        quantityActive: false,
        text: null
      });
    }
  }, [localIngredientName, localIngredientQuantity]);

  const onFormChange = (e) => setFieldValue(e.target.name, e.target.value);

  const onAddNewIngredient = () => {
    if (localIngredientError?.nameActive || localIngredientError?.quantityActive) {
      setLocalIngredientError((prev) => ({
        ...prev,
        showError: true
      }));

      return;
    }

    setFieldValue(RECIPE_FORM_KEYS.INGREDIENTS, [
      {
        [RECIPE_FORM_KEYS.NAME]: localIngredientName,
        [RECIPE_FORM_KEYS.QUANTITY]: localIngredientQuantity
      },
      ...values[RECIPE_FORM_KEYS.INGREDIENTS]
    ]);

    setLocalIngredientName('');
    setLocalIngredientQuantity('');
  };

  const onRemoveIngredient = (index) =>
    setFieldValue(RECIPE_FORM_KEYS.INGREDIENTS, [
      ...values[RECIPE_FORM_KEYS.INGREDIENTS].filter((item, i) => i !== index)
    ]);

  const renderAddNewIngredientBtn = () => (
    <CustomTooltip
      title="Add"
      arrow
      placement="top"
      sx={{
        padding: '5px',
        fontSize: '15px',
        fontWeight: 500
      }}>
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
    </CustomTooltip>
  );

  const renderDeleteIngredientBtn = (index) => (
    <CustomTooltip title="Remove" arrow placement="top">
      <IconButton
        variant="contained"
        sx={{ marginTop: '8px', backgroundColor: '#fff', width: '0px', height: '0px' }}
        onClick={() => onRemoveIngredient(index)}>
        <RemoveCircleRoundedIcon
          sx={{
            width: '35px',
            height: '35px',
            '&>path': {
              fill: '#ef0000'
            }
          }}
        />
      </IconButton>
    </CustomTooltip>
  );

  const renderErrorMsg = (msg) => (
    <div className="font-semibold text-base" style={{ color: '#ef0000' }}>
      {msg}
    </div>
  );

  return (
    <>
      <div className="bg-indigo-100 rounded-lg h-[670px] overflow-hidden">
        {isInsertNewRecipeLoading && <Spinner transparentCenter />}
        <div className="bg-indigo-500 h-[45px] w-full rounded-md text-white font-semibold text-lg px-[20px] flex items-center">
          Add New Recipe
        </div>

        <div style={{ height: '82%' }}>
          <Scrollbar>
            <div className="w-full p-[20px] flex flex-col gap-[30px] pb-[70px]">
              <div className="flex flex-col gap-[10px]">
                <TextInput
                  label="Enter Recipe name -"
                  onChange={onFormChange}
                  value={values?.[RECIPE_FORM_KEYS.RECIPE_NAME]}
                  name={RECIPE_FORM_KEYS.RECIPE_NAME}
                  placeholder="Ex - Chipotle Burger"
                  isInvalid={
                    errors[RECIPE_FORM_KEYS.RECIPE_NAME] && touched[RECIPE_FORM_KEYS.RECIPE_NAME]
                  }
                />
                {errors[RECIPE_FORM_KEYS.RECIPE_NAME] &&
                  touched[RECIPE_FORM_KEYS.RECIPE_NAME] &&
                  renderErrorMsg(errors[RECIPE_FORM_KEYS.RECIPE_NAME])}
              </div>

              <div className="flex flex-col gap-[8px]">
                <label className="block text-base font-semibold leading-6 pinkWhiteText MontserratFamily">
                  Ingredients -
                </label>

                <div className="flex flex-col">
                  <div
                    className="grid gap-[10px]"
                    style={{
                      gridTemplateColumns: '3fr 2fr'
                    }}>
                    <div className="text-base font-medium ">Name</div>
                    <div className="text-base font-medium">Quantity</div>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <div
                      className="grid gap-[10px]"
                      style={{
                        gridTemplateColumns: '3fr 2fr'
                      }}>
                      <CustomAutoComplete
                        options={allIngredients?.nameOptions || []}
                        setter={setLocalIngredientName}
                        value={localIngredientName}
                        placeholder="Ex - Tomato"
                        invalid={
                          (errors[RECIPE_FORM_KEYS.INGREDIENTS] &&
                            touched[RECIPE_FORM_KEYS.INGREDIENTS]) ||
                          (localIngredientError?.nameActive && localIngredientError?.showError)
                        }
                      />

                      <div className="flex gap-[15px] items-center">
                        <CustomAutoComplete
                          options={allIngredients?.quantityOptions || []}
                          setter={setLocalIngredientQuantity}
                          value={localIngredientQuantity}
                          placeholder="Ex - 100 g"
                          className="w-full"
                          invalid={
                            (errors[RECIPE_FORM_KEYS.INGREDIENTS] &&
                              touched[RECIPE_FORM_KEYS.INGREDIENTS]) ||
                            (localIngredientError?.quantityActive &&
                              localIngredientError?.showError)
                          }
                        />

                        {renderAddNewIngredientBtn()}
                      </div>
                    </div>

                    {(localIngredientError?.nameActive || localIngredientError?.quantityActive) &&
                      localIngredientError?.showError &&
                      renderErrorMsg(localIngredientError?.text)}

                    {errors[RECIPE_FORM_KEYS.INGREDIENTS] &&
                      touched[RECIPE_FORM_KEYS.INGREDIENTS] &&
                      renderErrorMsg(errors[RECIPE_FORM_KEYS.INGREDIENTS])}

                    {values?.[RECIPE_FORM_KEYS.INGREDIENTS]?.map((item, index) => {
                      return (
                        <div
                          className="grid gap-[10px]"
                          style={{
                            gridTemplateColumns: '3fr 2fr'
                          }}
                          key={index}>
                          <TextInput
                            value={item[RECIPE_FORM_KEYS.NAME]}
                            onChange={() => {}}
                            name={RECIPE_FORM_KEYS.NAME}
                            inputClassName="pointer-events-none bg-gray-700 text-white"
                          />
                          <div className="flex gap-[15px] items-center">
                            <TextInput
                              value={item[RECIPE_FORM_KEYS.QUANTITY]}
                              onChange={() => {}}
                              name={RECIPE_FORM_KEYS.QUANTITY}
                              inputClassName="pointer-events-none bg-gray-700 text-white"
                            />
                            {renderDeleteIngredientBtn(index)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[10px]">
                <TextInput
                  label="Enter Description -"
                  onChange={onFormChange}
                  value={values?.[RECIPE_FORM_KEYS.DESCRIPTION]}
                  name={RECIPE_FORM_KEYS.DESCRIPTION}
                  placeholder="Ex - Explain the process"
                  isTextArea
                  isInvalid={
                    errors[RECIPE_FORM_KEYS.DESCRIPTION] && touched[RECIPE_FORM_KEYS.DESCRIPTION]
                  }
                />
                {errors[RECIPE_FORM_KEYS.DESCRIPTION] &&
                  touched[RECIPE_FORM_KEYS.DESCRIPTION] &&
                  renderErrorMsg(errors[RECIPE_FORM_KEYS.DESCRIPTION])}
              </div>
            </div>
          </Scrollbar>
        </div>

        <div
          className="w-full border border-t-2 border-t-gray-900 flex justify-center items-center h-[80px]
      ">
          <Button
            variant="contained"
            sx={{ height: '42px', margin: 'auto 0', backgroundColor: '#2d3a47', width: '96%' }}
            onClick={submitForm}>
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
};

export default RecipeAdd;
