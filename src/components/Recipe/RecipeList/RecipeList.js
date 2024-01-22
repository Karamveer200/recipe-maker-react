/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react';
import BodyContainer from '../../Common/BodyContainer/BodyContainer';
import SideDrawer from '../../Common/SideDrawer/SideDrawer';
import { useNavigate } from 'react-router-dom';
import { LocalStorageContext } from '../../../context/LocalStorageContext';
import { ALL_ROUTES_PATHS } from '../../../utils/routes';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const RecipeList = () => {
  const navigate = useNavigate();
  const { recipes } = useContext(LocalStorageContext);

  const [isSideModalOpen, setIsSideModalOpen] = useState(false);

  const closeSideModal = () => {
    setIsSideModalOpen(false);
  };

  const openSideModal = () => {
    setIsSideModalOpen(true);
  };

  return (
    <>
      <BodyContainer
        heading="List of Recipes"
        whiteHeading
        className="h-screen"
        rootClassName="h-auto"
        rightHandComponent={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ height: '42px', margin: 'auto 0' }}>
            Add New Recipe
          </Button>
        }>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 pb-[15px]">
          <div className="grid md:grid-cols-2 md:gap-4 mt-[10px]"></div>
        </div>
      </BodyContainer>

      <SideDrawer isSideModalOpen={isSideModalOpen} onClose={closeSideModal}>
        asacs
      </SideDrawer>
    </>
  );
};

export default RecipeList;
