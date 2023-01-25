const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const dotenv = require('dotenv');

dotenv.config();

const pastry_routes = require("./routes/pastry.routes");
const user_routes = require("./routes/user.routes");

const app = express();

// this should be in a .env
const dbUri = "mongodb+srv://admin:admin@pasticceria.hu2dsez.mongodb.net/LuanaMaria?retryWrites=true&w=majority";

// middlewares
app.use(express.json());
app.use(cors());

app.use(pastry_routes);
app.use(user_routes);

const main = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT || 3000, () =>
      console.log("App has successfully started.")
    );
  } catch (e) {
    console.log(e.message);
  }
};

main();
