import TextInput from '../../Common/Inputs/TextInput';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { IconButton } from '@mui/material';
import { RECIPE_FORM_KEYS } from '../../../utils/constants';
import { Scrollbar } from 'react-scrollbars-custom';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { LocalStorageContext } from '../../../context/LocalStorageContext';

const RecipeAdd = ({ closeModal }) => {
  const { addNewRecipe } = useContext(LocalStorageContext);

  const newIngredientTemplate = { [RECIPE_FORM_KEYS.NAME]: '', [RECIPE_FORM_KEYS.QUANTITY]: '' };

  const { values, errors, touched, setFieldValue, submitForm } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [RECIPE_FORM_KEYS.RECIPE_NAME]: '',
      [RECIPE_FORM_KEYS.INGREDIENTS]: [newIngredientTemplate],
      [RECIPE_FORM_KEYS.DESCRIPTION]: ''
    },
    validationSchema: Yup.object().shape({
      [RECIPE_FORM_KEYS.RECIPE_NAME]: Yup.string().required('Name is required'),
      [RECIPE_FORM_KEYS.DESCRIPTION]: Yup.string().required('Description is required')
    }),
    onSubmit: (val, meta) => {
      try {
        addNewRecipe(val);

        toast.success('Your recipe has been saved successfully');
        meta.resetForm();
        closeModal();
      } catch (error) {
        console.log(error);
      }
    }
  });

  const onFormChange = (e) => setFieldValue(e.target.name, e.target.value);

  const onIngredientChange = (e, index, key) => {
    const modifyCurrentIngredient = values?.[RECIPE_FORM_KEYS.INGREDIENTS]?.map(
      (item, itemIndex) => {
        if (index === itemIndex) {
          return { ...item, [key]: e.target.value };
        }

        return item;
      }
    );

    setFieldValue(e.target.name, modifyCurrentIngredient);
  };

  const onAddNewIngredient = () =>
    setFieldValue(RECIPE_FORM_KEYS.INGREDIENTS, [
      ...values[RECIPE_FORM_KEYS.INGREDIENTS],
      newIngredientTemplate
    ]);

  const onRemoveIngredient = (index) =>
    setFieldValue(RECIPE_FORM_KEYS.INGREDIENTS, [
      ...values[RECIPE_FORM_KEYS.INGREDIENTS].filter((item, i) => i !== index)
    ]);

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

  const renderDeleteIngredientBtn = (index) => (
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
  );

  const renderErrorMsg = (msg) => (
    <div className="font-semibold text-base" style={{ color: '#ef0000' }}>
      {msg}
    </div>
  );

  return (
    <div className="bg-indigo-100 rounded-lg h-[570px] overflow-hidden">
      <div className="bg-indigo-500 h-[45px] w-full rounded-md text-white font-semibold text-lg px-[20px] flex items-center">
        Add New Recipe
      </div>

      <div style={{ height: '78%' }}>
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
                  <div className="text-base font-medium">Name</div>
                  <div className="text-base font-medium">Quantity</div>
                </div>
                <div className="flex flex-col gap-[10px]">
                  {values?.[RECIPE_FORM_KEYS.INGREDIENTS]?.map((item, index) => (
                    <div
                      className="grid gap-[10px]"
                      style={{
                        gridTemplateColumns: '3fr 2fr'
                      }}
                      key={index}>
                      <TextInput
                        onChange={(e) => onIngredientChange(e, index, 'name')}
                        value={item.name}
                        name={RECIPE_FORM_KEYS.INGREDIENTS}
                        placeholder="Ex - Lettuce"
                      />
                      <div className="flex gap-[15px] items-center">
                        <TextInput
                          onChange={(e) => onIngredientChange(e, index, 'quantity')}
                          value={item.quantity}
                          name={RECIPE_FORM_KEYS.INGREDIENTS}
                          placeholder="Ex - Lettuce"
                        />
                        {index === values?.[RECIPE_FORM_KEYS.INGREDIENTS]?.length - 1
                          ? renderAddNewIngredientBtn()
                          : renderDeleteIngredientBtn(index)}
                      </div>
                    </div>
                  ))}
                  {errors[RECIPE_FORM_KEYS.INGREDIENTS] &&
                    touched[RECIPE_FORM_KEYS.INGREDIENTS] &&
                    renderErrorMsg(errors[RECIPE_FORM_KEYS.INGREDIENTS])}
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
  );
};

export default RecipeAdd;
