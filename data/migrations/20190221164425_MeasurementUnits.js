exports.up = (knex, Promise) =>
  knex.schema.createTable("MeasurementUnits", tbl => {
    tbl.increments("MeasurementUnitID");
    tbl
      .string("MeasurementUnitName")
      .unique()
      .notNullable();
    tbl
      .string("MeasurementUnitAbbrev")
      .unique()
      .notNullable();
    tbl.timestamps(true, true);
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists("MeasurementUnits");
