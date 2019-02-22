exports.up = (knex, Promise) =>
  knex.schema.createTable("Ingredients", tbl => {
    tbl.increments("IngredientID");
    tbl
      .string("IngredientName")
      .unique()
      .notNullable();
    tbl.timestamps(true, true);
  });

exports.down = (knex, Promise) => knex.schema.dropTableIfExists("Ingredients");
