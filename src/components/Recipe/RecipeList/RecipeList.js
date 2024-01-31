/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import BodyContainer from '../../Common/BodyContainer/BodyContainer';
import SideDrawer from '../../Common/SideDrawer/SideDrawer';
import { LocalStorageContext } from '../../../context/LocalStorageContext';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Lottie from 'react-lottie';
import emptyLottie from '../../../assets/emptyLottie.json';
import Modal from '../../Common/Modal/Modal';
import RecipeAdd from '../RecipeAdd/RecipeAdd';
import TableData from '../../Common/Table/Table';
import { ARRAY_KEYS, RECIPE_FORM_KEYS } from '../../../utils/constants';
import { isArrayReady } from '../../../utils/helperFunctions';
import RecipeSideModal from './RecipeSideModal/RecipeSideModal';

const RecipeList = () => {
  const { recipes } = useContext(LocalStorageContext);

  const [showSideModal, setShowSideModal] = useState(false);
  const [showAddNewRecipeModal, setShowAddNewRecipeModal] = useState(false);

  const closeSideModal = () => {
    setShowSideModal(false);
  };

  const openSideModal = (row) => {
    setShowSideModal(row);
  };

  const closeAddNewModal = () => {
    setShowAddNewRecipeModal(false);
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
      { [ARRAY_KEYS.HEADER]: 'Name', [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.RECIPE_NAME },
      { [ARRAY_KEYS.HEADER]: 'Ingredients', [ARRAY_KEYS.VALUE]: '' },
      { [ARRAY_KEYS.HEADER]: 'Description', [ARRAY_KEYS.VALUE]: RECIPE_FORM_KEYS.DESCRIPTION }
    ];

    const bodyData = isArrayReady(recipes)?.map((item) => {
      return {
        [RECIPE_FORM_KEYS.RECIPE_NAME]: item[RECIPE_FORM_KEYS.RECIPE_NAME],
        [ARRAY_KEYS.DISPLAY_FN]: {
          [ARRAY_KEYS.VALUE]: item[RECIPE_FORM_KEYS.INGREDIENTS],
          component: <ShowIngredients item={item[RECIPE_FORM_KEYS.INGREDIENTS]} />
        },
        [RECIPE_FORM_KEYS.DESCRIPTION]: item[RECIPE_FORM_KEYS.DESCRIPTION]
      };
    });

    return <TableData headers={headers} bodyData={bodyData} onRowClick={onRowClick}></TableData>;
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
          {recipes?.length ? renderTable() : renderFallBackLoader()}
        </div>
      </BodyContainer>

      <SideDrawer isSideModalOpen={!!showSideModal} onClose={closeSideModal}>
        <RecipeSideModal data={showSideModal} />
      </SideDrawer>

      {showAddNewRecipeModal && (
        <Modal showModal closeModal={closeAddNewModal}>
          <RecipeAdd closeModal={closeAddNewModal} />
        </Modal>
      )}
    </>
  );
};

export default RecipeList;
