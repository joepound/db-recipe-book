exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("UnitConversions")
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex("UnitConversions").insert([
        { FromUnit: 1, ToUnit: 2, ConversionValue: 1000 },
        { FromUnit: 2, ToUnit: 1, ConversionValue: 0.001 }
      ])
    );
