const express = require("express");
const router = express.Router();

const dbHelper = require("../data_access/dishesHelper");
const sendError = require("../../errors/errorHandler");

router.get("/", (req, res) => {
  console.log("\nAttempting to GET all dishes...");
  dbHelper
    .getDishes()
    .then(dishes => res.status(200).json({ success: true, data: dishes }))
    .catch(err => sendError(res, 500, err.errno))
    .finally(console.log("GET all dishes attempt finished."));
});

router.post("/", (req, res) => {
  console.log("\nAttempting to POST new dish...");

  const newDish = req.body;

  console.log("Checking if all required fields were supplied...");
  if (newDish.DishName) {
    console.log("Proceeding to add the new student...");
    dbHelper
      .addDish(newDish)
      .then(dish => {
        res.status(201).json({ success: true, data: dish });
      })
      .catch(err => {
        // Code 19 here means that the UNIQUE constraint has been violated
        if (err.errno === 19) {
          sendError(res, 400, "Dish already exists.");
        } else {
          sendError(res, 500, err.errno);
        }
      })
      .finally(console.log("Dish POST attempt finished."));
  } else {
    sendError(res, 400, "Name not supplied.");
    console.log("Dish POST attempt finished.");
  }
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  console.log(
    `\nAttempting to GET dish with ID [${id}] and associated recipes...`
  );
  dbHelper
    .getDish(id)
    .then(dish => {
      if (dish) {
        res.status(200).json({ success: true, data: dish });
      } else {
        sendError(res, 404, `Dish with ID [${id}] not found.`);
      }
    })
    .catch(err => sendError(res, 500, err.errno))
    .finally(
      console.log(
        `GET attempt for dish ID [${id}] (and its associated recipes) finished.`
      )
    );
});

module.exports = router;
