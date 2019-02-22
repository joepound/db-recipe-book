exports.up = (knex, Promise) =>
  knex.schema.createTable("UnitConversions", tbl => {
    tbl
      .integer("FromUnit")
      .unsigned()
      .references("MeasurementUnitID")
      .inTable("MeasurementUnits")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl
      .integer("ToUnit")
      .unsigned()
      .references("MeasurementUnitID")
      .inTable("MeasurementUnits")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
    tbl.double("ConversionValue").notNullable();
    tbl.timestamps(true, true);

    tbl.primary(["FromUnit", "ToUnit"]);
  });

exports.down = (knex, Promise) =>
  knex.schema.dropTableIfExists("UnitConversions");
