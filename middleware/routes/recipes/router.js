const express = require("express");
const router = express.Router();

const dbHelper = require("../data_access/recipesHelper");
const sendError = require("../../errors/errorHandler");

router.get("/", (req, res) => {
  console.log("\nAttempting to GET all recipes...");
  dbHelper
    .getRecipes()
    .then(recipes => res.status(200).json({ success: true, data: recipes }))
    .catch(err => sendError(res, 500, err.errno))
    .finally(console.log("GET all recipes attempt finished."));
});

router.post("/", (req, res) => {
  console.log("\nAttempting to POST new recipe...");

  const newRecipe = req.body;

  console.log("Checking if all required fields were supplied...");
  if (!newRecipe.RecipeName) {
    sendError(res, 400, "Name not supplied.");
    console.log("Recipe POST attempt finished.");
  } else if (!newRecipe.RecipeInstructions) {
    sendError(res, 400, "Instructions not supplied.");
    console.log("Recipe POST attempt finished.");
  } else if (!newRecipe.DishID) {
    sendError(res, 400, "Associated dish not supplied.");
    console.log("Recipe POST attempt finished.");
  } else if (
    !newRecipe.RecipeIngredients ||
    !newRecipe.RecipeIngredients.length
  ) {
    sendError(res, 400, "No ingredients supplied.");
    console.log("Recipe POST attempt finished.");
  } else {
    console.log(
      "Checking if all recipe ingredients have valid information supplied..."
    );
    const validIngredientsInfoSupplied = true;
    for (let i = 0, len = newRecipe.RecipeIngredients.length; i < len; i++) {
      if (!newRecipe.RecipeIngredients[i].IngredientID) {
        validIngredientsInfoSupplied = false;
        sendError(
          res,
          400,
          "One or more invalid ingredients (or missing ingredient identifier)."
        );
        console.log("Recipe POST attempt finished.");
        break;
      } else if (!newRecipe.RecipeIngredients[i].IngredientQuantity) {
        validIngredientsInfoSupplied = false;
        sendError(
          res,
          400,
          "Invalid or missing quantity value for one or more ingredients."
        );
        console.log("Recipe POST attempt finished.");
        break;
      } else if (!newRecipe.RecipeIngredients[i].MeasurementUnitID) {
        validIngredientsInfoSupplied = false;
        sendError(
          res,
          400,
          "Invalid or missing unit of measure for one or more ingredients."
        );
        console.log("Recipe POST attempt finished.");
        break;
      }
    }

    if (validIngredientsInfoSupplied) {
      console.log("Proceeding to add the new recipe...");
      dbHelper
        .addRecipe(newRecipe)
        .then(recipe => res.status(201).json({ success: true, data: recipe }))
        .catch(err => sendError(res, 500, err.errno))
        .finally(console.log("Recipe POST attempt finished."));
    }
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  console.log(
    `\nAttempting to GET recipe with ID [${id}] and associated ingredients...`
  );
  dbHelper
    .getRecipe(id)
    .then(recipe => {
      if (recipe) {
        res.status(200).json({ success: true, data: recipe });
      } else {
        sendError(res, 404, `Recipe with ID [${id}] not found.`);
      }
    })
    .catch(err => sendError(res, 500, err.errno))
    .finally(
      `GET attempt for recipe ID [${id}] (and its associated ingredients) finished.`
    );
});

router.get("/:id/shoppingList", (req, res) => {
  const { id } = req.params;

  console.log(
    `\nAttempting to GET shopping list for recipe with ID [${id}]...`
  );
  dbHelper
    .getShoppingList(id)
    .then(shoppingList => {
      if (shoppingList) {
        res.status(200).json({ success: true, data: shoppingList });
      } else {
        sendError(res, 404, `Recipe with ID [${id}] not found.`);
      }
    })
    .catch(err => sendError(res, 500, err.errno))
    .finally(
      console.log(
        `GET attempt for shopping list for recipe with ID [${id}] finished.`
      )
    );
});

module.exports = router;
