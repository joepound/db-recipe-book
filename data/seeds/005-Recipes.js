exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("Recipes")
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex("Recipes").insert([
        {
          RecipeName: "Hawaiian Pizza".toUpperCase(),
          RecipeInstructions: "Mix 'em all!",
          DishID: 1
        },
        {
          RecipeName: "Tex-mex".toUpperCase(),
          RecipeInstructions: "Flick it....",
          DishID: 2
        },
        {
          RecipeName: "Granny's".toUpperCase(),
          RecipeInstructions: "Flick it....",
          DishID: 2
        }
      ])
    );
