import { useQuery } from 'react-query';

import { getAllIngredients } from '../services/recipe';

export const GET_ALL_INGREDIENTS = 'GET_ALL_INGREDIENTS';

export const useGetAllIngredients = (rest = {}) => {
  const { data: allIngredients, isFetching: isAllIngredientsFetching } = useQuery(
    [GET_ALL_INGREDIENTS],
    () => getAllIngredients(),
    rest
  );

  return {
    allIngredients,
    isAllIngredientsFetching
  };
};
