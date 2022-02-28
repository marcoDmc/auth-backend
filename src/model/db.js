const mongo = require("mongoose");
require("dotenv").config();
const uri = process.env.URI;

const mongodb = () => {
  mongo.connect(process.env.URI_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongo.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("connected to the database"));
};

module.exports = mongodb();