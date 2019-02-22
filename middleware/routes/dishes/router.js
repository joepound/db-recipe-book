const express = require("express");
const router = express.Router();

const db = require("../../../data/dbConfig");
const sqlErrors = require("../../errors/sqlErrorList");

router.get("/", (req, res) => {
  db("Dishes")
    .then(dishes => res.status(200).json(dishes))
    .catch(err => res.status(500).json(sqlErrors[err.errno]));
});

module.exports = router;
