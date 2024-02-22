import { useMutation } from 'react-query';

import { deleteRecipeById } from '../services/recipe';

export const useDeleteRecipe = ({ onSuccess, onError } = {}) => {
  const { mutate: deleteRecipe, isLoading: isDeleteRecipeLoading } = useMutation({
    mutationFn: (body) => deleteRecipeById(body.recipeId),
    onSuccess,
    onError
  });

  return { deleteRecipe, isDeleteRecipeLoading };
};
