const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();

// this should be in a .env
const dbUri =
  "mongodb+srv://admin:admin@pasticceria.hu2dsez.mongodb.net/pastry?retryWrites=true&w=majority";

// middlewares
app.use(express.json());
app.use(cors());
app.use(routes);

mongoose
  .set("strictQuery", true)
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(3000, () => console.log(dbUri)))
  .catch((e) => console.log(e));
