exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("MeasurementUnits")
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex("MeasurementUnits").insert([
        {
          MeasurementUnitName: "grams".toUpperCase(),
          MeasurementUnitAbbrev: "g."
        },
        {
          MeasurementUnitName: "milligrams".toUpperCase(),
          MeasurementUnitAbbrev: "mg."
        },
        {
          MeasurementUnitName: "cups".toUpperCase(),
          MeasurementUnitAbbrev: "c."
        },
        {
          MeasurementUnitName: "pieces".toUpperCase(),
          MeasurementUnitAbbrev: "pcs."
        }
      ])
    );
