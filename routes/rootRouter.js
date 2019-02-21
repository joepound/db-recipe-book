const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <h1>Recipe Book API</h1>
    <p>Welcome to the Recipe Book API!</p>
  `);
});

module.exports = router;
