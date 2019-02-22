/* Server imports */

const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Converts all Name fields to uppercase - used in enforcing  uniqueness of row values
const namesToUpperCase = require("./middleware/custom/namesToUpperCase");

const rootRouter = require("./middleware/routes/rootRouter");
const dishesRouter = require("./middleware/routes/dishes/router");
const errorRouter = require("./middleware/routes/errorRouter");

// server setup
const server = express();

// built-in middleware
server.use(express.json());

// third party middleware
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

// custom middleware (general)
server.use(namesToUpperCase);

// custom routing middleware
server.use("/", rootRouter); // routing for root URL
server.use("/api/dishes", dishesRouter);
server.use(errorRouter); // routing for URL's resolving to bad queries

module.exports = server;
