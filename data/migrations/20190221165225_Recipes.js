exports.up = (knex, Promise) =>
  knex.schema.createTable("Recipes", tbl => {
    tbl.increments("RecipeID");
    tbl
      .string("RecipeName")
      .unique()
      .notNullable();
    tbl.text("RecipeInstructions").notNullable();
    tbl
      .integer("DishID")
      .unsigned()
      .references("DishID")
      .inTable("Dishes")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
  });

exports.down = (knex, Promise) => knex.schema.dropTableIfExists("Recipes");
