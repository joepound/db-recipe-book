const recipeNamesToDish = dishWithRecipes => {
  if (dishWithRecipes.length) {
    // initialDish is used to cache field values for Dishes table from dishWithRecipes[0]
    const initialDish = dishWithRecipes[0],
      dish = {
        DishName: initialDish.DishName,
        DishRecipes: dishWithRecipes.map(row => row.RecipeName)
      };
    return dish;
  }
  return null;
};

const getRecipeAndDetails = (recipe, id) => {
  const recipeInfo = {
    RecipeName: recipe.RecipeName,
    RecipeInstructions: recipe.RecipeInstructions,
    DishID: recipe.DishID
  };
  const recipeDetailsInfo = recipe.RecipeIngredients.map(ingredient => ({
    RecipeID: id,
    IngredientID: ingredient.IngredientID,
    IngredientQuantity: ingredient.IngredientQuantity,
    MeasurementUnitID: ingredient.MeasurementUnitID
  }));
  return [recipeInfo, recipeDetailsInfo];
};

const ingredientsToRecipe = recipeWithIngredients => {
  if (recipeWithIngredients.length) {
    // initialRecipe is used to cache field values for Recipes table from recipeWithIngredients[0]
    const initialRecipe = recipeWithIngredients[0],
      recipe = {
        DishName: initialRecipe.DishName,
        RecipeName: initialRecipe.RecipeName,
        RecipeIngredients: recipeWithIngredients.map(row => ({
          IngredientName: row.IngredientName,
          IngredientQuantity: row.IngredientQuantity,
          MeasurementUnitName: row.MeasurementUnitName,
          MeasurementUnitAbbrev: row.MeasurementUnitAbbrev
        }))
      };
    return recipe;
  }
  return null;
};

module.exports = {
  recipeNamesToDish,
  getRecipeAndDetails,
  ingredientsToRecipe
};
