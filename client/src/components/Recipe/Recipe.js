import { useState } from 'react';
import { useQueryClient } from 'react-query';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import SideDrawer from '../Common/SideDrawer/SideDrawer';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Lottie from 'react-lottie';
import emptyLottie from '../../assets/emptyLottie.json';
import Modal from '../Common/Modal/Modal';
import UnsavedChangesModal from '../Common/Modal/UnsavedChangesModal';
import RecipeAdd from './RecipeAdd/RecipeAdd';
import TableData from '../Common/Table/Table';
import { ARRAY_KEYS, RECIPE_FORM_KEYS, RECIPE_ADD_VALIDATION } from '../../utils/constants';
import { isArrayReady } from '../../utils/helperFunctions';
import RecipeSideModal from './RecipeSideModal/RecipeSideModal';
import { useGetAllRecipes, GET_ALL_RECIPES } from '../../hooks/useGetAllRecipes';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useInsertRecipe } from '../../hooks/useInsertRecipe';

const Recipe = () => {
  const queryClient = useQueryClient();

  const { allRecipes: recipes, isAllRecipesFetching } = useGetAllRecipes();

  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [showSideModal, setShowSideModal] = useState(false);
  const [showAddNewRecipeModal, setShowAddNewRecipeModal] = useState(false);

  const newIngredientTemplate = { [RECIPE_FORM_KEYS.NAME]: '', [RECIPE_FORM_KEYS.QUANTITY]: '' };

  const { insertNewRecipe, isInsertNewRecipeLoading } = useInsertRecipe({
    onSuccess: () => {
      toast.success('Your recipe has been saved successfully');
      onSuccessUnsavedModalClick();
      queryClient.invalidateQueries([GET_ALL_RECIPES]);
    },
    onError: () => {
      toast.error('Action failed');
    }
  });

  const { values, errors, touched, setFieldValue, submitForm, resetForm, dirty } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [RECIPE_FORM_KEYS.RECIPE_NAME]: '',
      [RECIPE_FORM_KEYS.INGREDIENTS]: [newIngredientTemplate],
      [RECIPE_FORM_KEYS.DESCRIPTION]: ''
    },
    validationSchema: RECIPE_ADD_VALIDATION,
    onSubmit: insertNewRecipe
  });

  const closeSideModal = () => {
    setShowSideModal(false);
  };

  const openSideModal = (row) => {
    setShowSideModal(row);
  };

  const closeAddNewModal = () => {
    if (dirty) {
      setShowUnsavedModal(true);
      return;
    }

    setShowAddNewRecipeModal(false);
    resetForm();
  };

  const onSuccessUnsavedModalClick = () => {
    setShowUnsavedModal(false);
    setShowAddNewRecipeModal(false);
    resetForm();
  };

  const onCancelUnsavedModalClick = () => {
    setShowUnsavedModal(false);
  };

  const openAddNewModal = () => {
    setShowAddNewRecipeModal(true);
  };

  const onRowClick = (row) => {
    openSideModal(row);
  };

  const renderAddNewRecipeButton = () => (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      sx={{ height: '42px', margin: 'auto 0', backgroundColor: '#6366f1' }}
      onClick={openAddNewModal}>
      Add New Recipe
    </Button>
  );

  const renderFallBackLoader = () => (
    <div className="w-full border-2 border-indigo-500 px-10 py-8 rounded-md flex flex-col gap-[50px]">
      <div className="w-fit mx-auto">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: emptyLottie,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }}
          height={250}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-[20px]">
        <p className="text-2xl font-semibold">Sorry, No recipes found...</p>
        {renderAddNewRecipeButton()}
      </div>
    </div>
  );

  const ShowIngredients = ({ item }) => {
    let joinIngredients = item
      ?.slice(0, 4)
      ?.map((item) => item[RECIPE_FORM_KEYS.NAME])
      ?.join(', ');
    if (item?.length > 4) joinIngredients = `${joinIngredients}...`;

    return <div>{joinIngredients}</div>;
  };

  const renderTable = () => {
    const headers = [
      { [ARRAY_KEYS.HEADER]: 'Recipe Id', [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.RECIPE_ID },
      { [ARRAY_KEYS.HEADER]: 'Name', [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.RECIPE_NAME },
      { [ARRAY_KEYS.HEADER]: 'Ingredients', [ARRAY_KEYS.VALUE]: '' },
      { [ARRAY_KEYS.HEADER]: 'Description', [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.DESCRIPTION }
    ];

    const bodyData = isArrayReady(recipes)?.map((item) => {
      return {
        [RECIPE_FORM_KEYS.RECIPE_ID]: item[RECIPE_FORM_KEYS.RECIPE_ID],
        [RECIPE_FORM_KEYS.RECIPE_NAME]: item[RECIPE_FORM_KEYS.RECIPE_NAME],
        [ARRAY_KEYS.DISPLAY_FN]: {
          [ARRAY_KEYS.VALUE]: item[RECIPE_FORM_KEYS.INGREDIENTS],
          component: <ShowIngredients item={item[RECIPE_FORM_KEYS.INGREDIENTS]} />
        },
        [RECIPE_FORM_KEYS.DESCRIPTION]: item[RECIPE_FORM_KEYS.DESCRIPTION]
      };
    });

    return (
      <TableData
        headers={headers}
        bodyData={bodyData}
        onRowClick={onRowClick}
        isFetching={isAllRecipesFetching}></TableData>
    );
  };

  return (
    <>
      <BodyContainer
        heading="List of Recipes"
        whiteHeading
        className="h-screen"
        rootClassName="h-auto"
        rightHandComponent={renderAddNewRecipeButton()}>
        <div className="flex pb-[250px]">
          {recipes?.length || isAllRecipesFetching ? renderTable() : renderFallBackLoader()}
        </div>
      </BodyContainer>

      <SideDrawer isSideModalOpen={!!showSideModal} onClose={closeSideModal}>
        <RecipeSideModal data={showSideModal} />
      </SideDrawer>

      {showAddNewRecipeModal && (
        <Modal showModal closeModal={closeAddNewModal}>
          <RecipeAdd
            isInsertNewRecipeLoading={isInsertNewRecipeLoading}
            values={values}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            submitForm={submitForm}
            dirty={dirty}
            newIngredientTemplate={newIngredientTemplate}
          />
        </Modal>
      )}

      {showUnsavedModal && (
        <UnsavedChangesModal
          showModal
          onSuccess={onSuccessUnsavedModalClick}
          onCancel={onCancelUnsavedModalClick}
        />
      )}
    </>
  );
};

export default Recipe;
