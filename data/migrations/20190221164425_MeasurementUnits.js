exports.up = (knex, Promise) =>
  knex.schema.createTable("MeasurementUnits", tbl => {
    tbl.increments("MeasurementUnitID");
    tbl
      .string("MeasurementUnitName")
      .unique()
      .notNullable();
    tbl
      .integer("QuantityTypeID")
      .unsigned()
      .references("QuantityTypeID")
      .inTable("QuantityTypes")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl.timestamps(true, true);
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists("MeasurementUnits");
