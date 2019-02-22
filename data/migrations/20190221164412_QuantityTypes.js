exports.up = (knex, Promise) =>
  knex.schema.createTable("QuantityTypes", tbl => {
    tbl.increments("QuantityTypeID");
    tbl
      .string("QuantityTypeName")
      .unique()
      .notNullable();
    tbl.timestamps(true, true);
  });

exports.down = (knex, Promise) => knex.schema.dropTableIfExists("QuantityTypes");
