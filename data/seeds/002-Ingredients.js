exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("Ingredients")
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex("Ingredients").insert([
        { IngredientName: "corn flour".toUpperCase() },
        { IngredientName: "butter".toUpperCase() },
        { IngredientName: "pineapple".toUpperCase() }
      ])
    );
