const express = require("express");
const routes = express.Router();
const controllers = require("../controllers/controllers");
const private = require("../controllers/private");
const midlewares = require("../middlewares/midle");

routes.post("/", controllers.create);
routes.post("/signin", controllers.authenticated);
routes.post("/privates", midlewares.auth, private.teste);

module.exports = routes;
