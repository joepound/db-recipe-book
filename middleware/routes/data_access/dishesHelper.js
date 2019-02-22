const db = require("../../../data/dbConfig");
const mappers = require("./mappers");

const getDishes = () => {
  return db("Dishes");
};

const addDish = dish => {
  return db("Dishes")
    .insert(dish)
    .then(dishes => dishes[0]);
};

const getDish = id => {
  return db("Dishes")
    .select("Dishes.DishName", "Recipes.RecipeName")
    .join("Recipes", { "Dishes.DishID": "Recipes.DishID" })
    .where({ "Dishes.DishID": id })
    .then(dishWithRecipes => mappers.recipeNamesToDish(dishWithRecipes));
};

module.exports = {
  getDishes,
  addDish,
  getDish
};
