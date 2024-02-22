import { useMutation } from 'react-query';

import { editRecipeById } from '../services/recipe';

export const useEditRecipe = ({ onSuccess, onError } = {}) => {
  const { mutate: editRecipe, isLoading: isEditLoading } = useMutation({
    mutationFn: ({ id, body }) => {
      return editRecipeById(id, body);
    },
    onSuccess,
    onError
  });

  return { editRecipe, isEditLoading };
};
