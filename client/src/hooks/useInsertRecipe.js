import { useMutation } from 'react-query';

import { insertRecipe } from '../services/recipe';

export const useInsertRecipe = ({ onSuccess, onError } = {}) => {
  const { mutate: insertNewRecipe, isLoading: isInsertNewRecipeLoading } = useMutation({
    mutationFn: (body) => insertRecipe(body),
    onSuccess,
    onError
  });

  return { insertNewRecipe, isInsertNewRecipeLoading };
};
