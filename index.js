const mongoose = require("mongoose");
const routes = require("./routes/routes");
const express = require("express");

const app = express();

// this should be in a .env
const dbUri = 'mongodb+srv://admin:admin@pasticcerialuanamaria.ixyuazx.mongodb.net/?retryWrites=true&w=majority';

// middlewares
app.use(routes);
app.use(express.json());

mongoose
  .set("strictQuery", true)
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(3000, () => console.log(dbUri)))
  .catch((e) => console.log(e));
