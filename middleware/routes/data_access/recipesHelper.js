const db = require("../../../data/dbConfig");
const mappers = require("./mappers");

const getRecipes = () => {
  return db("Recipes")
    .select("Dishes.DishName", "Recipes.*")
    .join("Dishes", { "Recipes.DishID": "Dishes.DishID" });
};

const addRecipe = newRecipe => {
  /*
    Expected object format (Javascript types):
    ------------------------------------------
    {
      "RecipeName": string
      "RecipeInstructions": string
      "DishID": number (integer)
      "RecipeIngredients": array of objects -> [
        {
          "IngredientID": number (integer)
          "IngredientQuantity": string
          "MeasurementUnitID": number (integer)	
        },
        ...
      ]
    }
  */

  return db("Recipes").then(recipes => {
    const new_id = recipes.length + 1;

    const [recipeInfo, recipeDetailsInfo] = mappers.getRecipeAndDetails(
      newRecipe,
      new_id // Expression for the next incremental ID
    );

    // Ensure rollback if either INSERT statement fails to avoid reference table inconsistency
    return db.transaction(recipeInsertion => {
      return db("Recipes")
        .insert(recipeInfo)
        .transacting(recipeInsertion)
        .then(() => {
          return db("RecipeDetails")
            .insert(recipeDetailsInfo)
            .transacting(recipeInsertion)
            .then(() => new_id);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    });
  });
};

const getRecipe = id => {
  return db("Recipes")
    .select(
      "Dishes.DishName",
      "Recipes.RecipeName",
      "Ingredients.IngredientName",
      "RecipeDetails.IngredientQuantity",
      "MeasurementUnits.MeasurementUnitName",
      "MeasurementUnits.MeasurementUnitAbbrev"
    )
    .join("Dishes", { "Recipes.DishID": "Dishes.DishID" })
    .join("RecipeDetails", { "Recipes.RecipeID": "RecipeDetails.RecipeID" })
    .join("Ingredients", {
      "RecipeDetails.IngredientID": "Ingredients.IngredientID"
    })
    .join("MeasurementUnits", {
      "RecipeDetails.MeasurementUnitID": "MeasurementUnits.MeasurementUnitID"
    })
    .where({ "Recipes.RecipeID": id })
    .then(recipeWithIngredients =>
      mappers.ingredientsToRecipe(recipeWithIngredients)
    );
};

const getShoppingList = id => {
  return db("Ingredients")
    .select(
      "Ingredients.IngredientName",
      "RecipeDetails.IngredientQuantity",
      "MeasurementUnits.MeasurementUnitID",
      "MeasurementUnits.MeasurementUnitName",
      "MeasurementUnits.MeasurementUnitAbbrev"
    )
    .join("RecipeDetails", {
      "Ingredients.IngredientID": "RecipeDetails.IngredientID"
    })
    .join("MeasurementUnits", {
      "RecipeDetails.MeasurementUnitID": "MeasurementUnits.MeasurementUnitID"
    })
    .where({ "RecipeDetails.RecipeID": id })
    .first();
};

module.exports = {
  getRecipes,
  addRecipe,
  getRecipe,
  getShoppingList
};
