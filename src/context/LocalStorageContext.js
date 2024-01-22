/* eslint-disable no-unused-vars */
import { createContext, useState } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import { parseLocalStorageToArray } from '../utils/helperFunctions';

export const LocalStorageContext = createContext();

const LocalStorageContextComponent = (props) => {
  const [recipes, setRecipes] = useState([]);

  const addNewRecipe = ({ name, ingredients, directions }) => {
    const existingRecipes = parseLocalStorageToArray(LOCAL_STORAGE_KEYS.RECIPES);

    console.log('existingRecipes before - ', existingRecipes);

    const newRecipe = {
      name,
      ingredients,
      directions
    };

    existingRecipes.push(newRecipe);

    console.log('existingRecipes after - ', existingRecipes);
  };

  return (
    <LocalStorageContext.Provider
      value={{
        recipes,
        addNewRecipe
      }}>
      {props.children}
    </LocalStorageContext.Provider>
  );
};

export default LocalStorageContextComponent;
