exports.up = (knex, Promise) =>
  knex.schema.createTable("RecipeDetails", tbl => {
    tbl
      .integer("RecipeID")
      .unsigned()
      .references("RecipeID")
      .inTable("Recipes")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl
      .integer("IngredientID")
      .unsigned()
      .references("IngredientID")
      .inTable("Ingredients")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl.double("Quantity").notNullable();
    tbl
      .integer("MeasurementUnitID")
      .unsigned()
      .references("MeasurementUnitID")
      .inTable("MeasurementUnits")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);

    tbl.primary(["RecipeID", "IngredientID"]);
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists("RecipeDetails");
