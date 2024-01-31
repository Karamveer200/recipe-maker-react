/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';
import { parseLocalStorageToArray } from '../utils/helperFunctions';

export const LocalStorageContext = createContext();

const LocalStorageContextComponent = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getAllRecipes = parseLocalStorageToArray(LOCAL_STORAGE_KEYS.RECIPES);

    if (getAllRecipes?.length) setRecipes(getAllRecipes);
  }, []);

  const addNewRecipe = (val) => {
    const getAllRecipes = parseLocalStorageToArray(LOCAL_STORAGE_KEYS.RECIPES);
    const payload = [...getAllRecipes, val];
    localStorage.setItem(LOCAL_STORAGE_KEYS.RECIPES, JSON.stringify(payload));

    setRecipes(payload);
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
