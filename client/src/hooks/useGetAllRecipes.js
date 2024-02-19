import { useQuery } from 'react-query';

import { getAllRecipes } from '../services/recipe';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';

export const useGetAllRecipes = (rest = {}) => {
  const { data: allRecipes, isFetching: isAllRecipesFetching } = useQuery(
    [GET_ALL_RECIPES],
    () => getAllRecipes(),
    rest
  );

  return {
    allRecipes,
    isAllRecipesFetching
  };
};
