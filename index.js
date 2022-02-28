const express = require("express");
const app = express();
const router = require("./src/routes/routes");
const mongodb = require("./src/model/db");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT, () => console.log("server on"));
