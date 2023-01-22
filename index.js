const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => console.log("server has started successfully"));
  })
  .catch((e) => console.log(e));

//middlewares
