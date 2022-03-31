const express = require("express");
const routes = express.Router();
const controllers = require("../controllers/controllers");
const midlewares = require("../middlewares/midle");

routes.post("/", controllers.create);
routes.post("/signin", controllers.authenticated);

module.exports = routes;
