exports.up = (knex, Promise) =>
  knex.schema.createTable("Dishes", tbl => {
    tbl.increments("DishID");
    tbl
      .string("DishName")
      .unique()
      .notNullable();
    tbl.timestamps(true, true);
  });

exports.down = (knex, Promise) => knex.schema.dropTableIfExists("Dishes");
