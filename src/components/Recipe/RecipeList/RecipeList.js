/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import BodyContainer from '../../Common/BodyContainer/BodyContainer';
import SideDrawer from '../../Common/SideDrawer/SideDrawer';
import { LocalStorageContext } from '../../../context/LocalStorageContext';
import { ALL_ROUTES_PATHS } from '../../../utils/routes';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Lottie from 'react-lottie';
import emptyLottie from '../../../assets/emptyLottie.json';

const RecipeList = () => {
  const { recipes } = useContext(LocalStorageContext);

  const [isSideModalOpen, setIsSideModalOpen] = useState(false);

  const closeSideModal = () => {
    setIsSideModalOpen(false);
  };

  const openSideModal = () => {
    setIsSideModalOpen(true);
  };

  const renderAddNewRecipeButton = () => (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      sx={{ height: '42px', margin: 'auto 0', backgroundColor: '#6366f1' }}>
      Add New Recipe
    </Button>
  );

  return (
    <>
      <BodyContainer
        heading="List of Recipes"
        whiteHeading
        className="h-screen"
        rootClassName="h-auto"
        rightHandComponent={renderAddNewRecipeButton()}>
        <div className="flex pb-[250px]">
          {recipes?.length ? (
            <div className=""></div>
          ) : (
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
          )}
        </div>
      </BodyContainer>

      <SideDrawer isSideModalOpen={isSideModalOpen} onClose={closeSideModal}>
        asacs
      </SideDrawer>
    </>
  );
};

export default RecipeList;
