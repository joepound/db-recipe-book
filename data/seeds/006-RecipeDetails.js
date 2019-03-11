exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("RecipeDetails")
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex("RecipeDetails").insert([
        {
          RecipeID: 1,
          IngredientID: 1,
          IngredientQuantity: 2,
          MeasurementUnitID: 3
        },
        {
          RecipeID: 1,
          IngredientID: 2,
          IngredientQuantity: 5,
          MeasurementUnitID: 1
        },
        {
          RecipeID: 1,
          IngredientID: 3,
          IngredientQuantity: 1,
          MeasurementUnitID: 4
        },
        {
          RecipeID: 2,
          IngredientID: 1,
          IngredientQuantity: 1,
          MeasurementUnitID: 3
        },
        {
          RecipeID: 2,
          IngredientID: 2,
          IngredientQuantity: 2.5,
          MeasurementUnitID: 1
        },
        {
          RecipeID: 3,
          IngredientID: 1,
          IngredientQuantity: 1,
          MeasurementUnitID: 3
        },
        {
          RecipeID: 3,
          IngredientID: 2,
          IngredientQuantity: 1.25,
          MeasurementUnitID: 1
        },
      ])
    );
