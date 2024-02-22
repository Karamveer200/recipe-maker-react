import { useState } from 'react';
import { useQueryClient } from 'react-query';
import BodyContainer from '../Common/BodyContainer/BodyContainer';
import SideDrawer from '../Common/SideDrawer/SideDrawer';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Lottie from 'react-lottie';
import emptyLottie from '../../assets/emptyLottie.json';
import Modal from '../Common/Modal/Modal';
import ConfirmModal from '../Common/Modal/ConfirmModal';
import RecipeAdd from './RecipeAdd/RecipeAdd';
import TableData, { StyledText } from '../Common/Table/Table';
import {
  ARRAY_KEYS,
  RECIPE_FORM_KEYS,
  RECIPE_ADD_VALIDATION,
  LOCAL_INGREDIENT_QUANTITIES,
  LOCAL_INGREDIENT_NAMES
} from '../../utils/constants';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  isArrayReady,
  getUserLocalTimezone,
  convertTimeToMomentFormat
} from '../../utils/helperFunctions';
import RecipeSideModal from './RecipeSideModal/RecipeSideModal';
import { useGetAllRecipes, GET_ALL_RECIPES } from '../../hooks/useGetAllRecipes';
import { useGetAllIngredients, GET_ALL_INGREDIENTS } from '../../hooks/useGetAllIngredients';
import { removeDuplicates } from '../../utils/helperFunctions';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useInsertRecipe } from '../../hooks/useInsertRecipe';
import { useEditRecipe } from '../../hooks/useEditRecipe';
import { useDeleteRecipe } from '../../hooks/useDeleteRecipe';

const Recipe = () => {
  const queryClient = useQueryClient();

  const { allRecipes: recipes, isAllRecipesFetching } = useGetAllRecipes();

  const { allIngredients, isAllIngredientsFetching } = useGetAllIngredients({
    select: (res) => ({
      nameOptions: removeDuplicates(
        [...res.nameOptions, ...LOCAL_INGREDIENT_NAMES].sort((a, b) =>
          a.label.localeCompare(b.label)
        )
      ),
      quantityOptions: removeDuplicates(
        [...res.quantityOptions, ...LOCAL_INGREDIENT_QUANTITIES].sort((a, b) =>
          a.label.localeCompare(b.label)
        )
      )
    })
  });

  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(null);

  const [showSideModal, setShowSideModal] = useState(false);
  const [showAddNewRecipeModal, setShowAddNewRecipeModal] = useState(false);

  const [showEditRecipeModal, setShowEditRecipeModal] = useState(null);

  const { insertNewRecipe, isInsertNewRecipeLoading } = useInsertRecipe({
    onSuccess: () => {
      toast.success('Your recipe has been saved successfully');
      onSuccessUnsavedModalClick();
      queryClient.invalidateQueries([GET_ALL_RECIPES]);
      queryClient.invalidateQueries([GET_ALL_INGREDIENTS]);
    },
    onError: () => {
      toast.error('Action failed');
    }
  });

  const { editRecipe, isEditLoading } = useEditRecipe({
    onSuccess: () => {
      toast.success('Your recipe has been edited successfully');
      setShowEditRecipeModal(null);
      queryClient.invalidateQueries([GET_ALL_RECIPES]);
      queryClient.invalidateQueries([GET_ALL_INGREDIENTS]);
    },
    onError: () => {
      toast.error('Action failed');
    }
  });

  const { deleteRecipe, isDeleteRecipeLoading } = useDeleteRecipe({
    onSuccess: () => {
      toast.success('Your recipe has been deleted');
      setShowDeleteConfirmModal(null);
      queryClient.invalidateQueries([GET_ALL_RECIPES]);
      queryClient.invalidateQueries([GET_ALL_INGREDIENTS]);
    },
    onError: () => {
      toast.error('Action failed');
    }
  });

  const { values, errors, touched, setFieldValue, submitForm, resetForm, dirty } = useFormik({
    enableReinitialize: true,
    initialValues: {
      [RECIPE_FORM_KEYS.RECIPE_NAME]: showEditRecipeModal
        ? showEditRecipeModal[RECIPE_FORM_KEYS.RECIPE_NAME]
        : '',
      [RECIPE_FORM_KEYS.INGREDIENTS]: showEditRecipeModal
        ? showEditRecipeModal[RECIPE_FORM_KEYS.INGREDIENTS]
        : [],
      [RECIPE_FORM_KEYS.DESCRIPTION]: showEditRecipeModal
        ? showEditRecipeModal[RECIPE_FORM_KEYS.DESCRIPTION]
        : ''
    },
    validationSchema: RECIPE_ADD_VALIDATION,
    onSubmit: (v) =>
      showEditRecipeModal
        ? editRecipe({ id: showEditRecipeModal[RECIPE_FORM_KEYS.RECIPE_ID], body: v })
        : insertNewRecipe(v)
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
    setShowEditRecipeModal(null);
    resetForm();
  };

  const onSuccessUnsavedModalClick = () => {
    setShowUnsavedModal(false);
    setShowAddNewRecipeModal(false);
    setShowEditRecipeModal(null);
    resetForm();
  };

  const openAddNewModal = () => {
    setShowAddNewRecipeModal(true);
  };

  const onCancelUnsavedModalClick = () => {
    setShowUnsavedModal(false);
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
    if (!item) return <div>---</div>;

    if (item?.length === 1) {
      return (
        <StyledText fontSize={14} textAlign="left">
          🔵 {item[0][RECIPE_FORM_KEYS.NAME]}
        </StyledText>
      );
    }

    if (item?.length === 2) {
      return (
        <>
          <StyledText fontSize={14} textAlign="left">
            🔵 {item[0][RECIPE_FORM_KEYS.NAME]}
          </StyledText>
          <StyledText fontSize={14} textAlign="left" mt={1}>
            🔵 {item[1][RECIPE_FORM_KEYS.NAME]}
          </StyledText>
        </>
      );
    }

    return (
      <>
        <StyledText fontSize={14} textAlign="left">
          🔵 {item[0][RECIPE_FORM_KEYS.NAME]}
        </StyledText>
        <StyledText fontSize={14} textAlign="left" mt={1}>
          🔵 {item[1][RECIPE_FORM_KEYS.NAME]}
        </StyledText>
        <StyledText fontSize={14} mt={1} textAlign="left">
          + {item.length - 2} More...
        </StyledText>
      </>
    );
  };

  const ShowTime = ({ time }) => {
    const { date, time: formattedTime } = convertTimeToMomentFormat(time);

    return (
      <>
        <StyledText fontSize={14} textAlign="left">
          {date}
        </StyledText>
        <StyledText fontSize={14} textAlign="left" mt={1}>
          {formattedTime}
        </StyledText>
      </>
    );
  };

  const RowActions = ({ item }) => {
    return (
      <div className="flex gap-[15px] w-full justify-center">
        <div
          className=" w-[40px] h-[40px] cursor-pointer rounded-full bg-green-500 flex justify-center items-center hover:bg-gray-600 transition-all ease-in duration-150"
          onClick={() => setShowEditRecipeModal(item)}>
          <EditRoundedIcon sx={{ fontSize: '27px' }} />
        </div>
        <div
          className="w-[40px] h-[40px] cursor-pointer rounded-full bg-red-500 flex justify-center items-center hover:bg-gray-600 transition-all ease-in duration-150"
          onClick={() => setShowDeleteConfirmModal(item)}>
          <DeleteIcon sx={{ fontSize: '27px' }} />
        </div>
      </div>
    );
  };

  const isLoading = isAllIngredientsFetching || isAllRecipesFetching || isDeleteRecipeLoading;

  const renderTable = () => {
    const headers = [
      {
        [ARRAY_KEYS.HEADER]: 'Recipe Id',
        [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.RECIPE_ID,
        [ARRAY_KEYS.MAX_WIDTH]: '60px'
      },
      {
        [ARRAY_KEYS.HEADER]: 'Name',
        [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.RECIPE_NAME,
        [ARRAY_KEYS.MAX_WIDTH]: '150px'
      },
      {
        [ARRAY_KEYS.HEADER]: 'Ingredients',
        [ARRAY_KEYS.VALUE]: '',
        [ARRAY_KEYS.MAX_WIDTH]: '130px'
      },
      {
        [ARRAY_KEYS.HEADER]: 'Description',
        [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.DESCRIPTION,
        [ARRAY_KEYS.MAX_WIDTH]: '130px'
      },
      {
        [ARRAY_KEYS.HEADER]: `Last Updated (${getUserLocalTimezone()})`,
        [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.UPDATED_AT,
        [ARRAY_KEYS.MAX_WIDTH]: '120px'
      },
      {
        [ARRAY_KEYS.HEADER]: `Created At (${getUserLocalTimezone()})`,
        [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.CREATED_AT,
        [ARRAY_KEYS.MAX_WIDTH]: '120px'
      },
      {
        [ARRAY_KEYS.HEADER]: 'Actions',
        [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.ACTIONS,
        [ARRAY_KEYS.MAX_WIDTH]: '120px'
      }
    ];

    const bodyData = isArrayReady(recipes)?.map((item) => {
      return {
        [RECIPE_FORM_KEYS.RECIPE_ID]: item[RECIPE_FORM_KEYS.RECIPE_ID],
        [RECIPE_FORM_KEYS.RECIPE_NAME]: (
          <StyledText fontSize={14}>{item[RECIPE_FORM_KEYS.RECIPE_NAME]}</StyledText>
        ),
        [ARRAY_KEYS.DISPLAY_FN]: {
          [ARRAY_KEYS.VALUE]: item[RECIPE_FORM_KEYS.INGREDIENTS],
          component: <ShowIngredients item={item[RECIPE_FORM_KEYS.INGREDIENTS]} />
        },
        [RECIPE_FORM_KEYS.DESCRIPTION]: (
          <StyledText fontSize={14}>{item[RECIPE_FORM_KEYS.DESCRIPTION]}</StyledText>
        ),
        [RECIPE_FORM_KEYS.UPDATED_AT]: <ShowTime time={item[RECIPE_FORM_KEYS.UPDATED_AT]} />,
        [RECIPE_FORM_KEYS.CREATED_AT]: <ShowTime time={item[RECIPE_FORM_KEYS.CREATED_AT]} />,
        [RECIPE_FORM_KEYS.ACTIONS]: <RowActions item={item} />
      };
    });

    return (
      <TableData
        headers={headers}
        bodyData={bodyData}
        onRowClick={onRowClick}
        isFetching={isLoading}
      />
    );
  };

  return (
    <div className="h-full pt-[80px]">
      <BodyContainer
        heading="List of Recipes"
        whiteHeading
        rootClassName={'h-full'}
        rightHandComponent={renderAddNewRecipeButton()}>
        <div className="flex pb-[110px] pt-[20px]">
          {recipes?.length || isLoading ? renderTable() : renderFallBackLoader()}
        </div>
      </BodyContainer>

      <SideDrawer isSideModalOpen={!!showSideModal} onClose={closeSideModal}>
        <RecipeSideModal
          data={showSideModal}
          setShowDeleteConfirmModal={setShowDeleteConfirmModal}
        />
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
            allIngredients={allIngredients}
          />
        </Modal>
      )}

      {!!showEditRecipeModal && (
        <Modal showModal closeModal={closeAddNewModal}>
          <RecipeAdd
            isInsertNewRecipeLoading={isEditLoading}
            values={values}
            errors={errors}
            touched={touched}
            setFieldValue={setFieldValue}
            submitForm={submitForm}
            dirty={dirty}
            allIngredients={allIngredients}
            isEditMode
          />
        </Modal>
      )}

      {showUnsavedModal && (
        <ConfirmModal
          showModal
          onSuccess={onSuccessUnsavedModalClick}
          onCancel={onCancelUnsavedModalClick}
          text="You have unsaved changes. Do you still want to close ?"
        />
      )}

      {!!showDeleteConfirmModal && (
        <ConfirmModal
          showModal
          onSuccess={() => deleteRecipe(showDeleteConfirmModal)}
          onCancel={() => setShowDeleteConfirmModal(null)}
          onClose={() => setShowDeleteConfirmModal(null)}
          text={`You are about to delete a <strong>${showDeleteConfirmModal.recipeName}</strong> recipe. Are you sure ?`}
        />
      )}
    </div>
  );
};

export default Recipe;
