exports.seed = (knex, Promise) =>
  // Deletes ALL existing entries
  knex("Dishes")
    .truncate()
    .then(() =>
      // Inserts seed entries
      knex("Dishes").insert([
        { DishName: "TACO" },
        { DishName: "PIZZA" },
      ])
    );
