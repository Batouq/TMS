const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRouter = require("./routes.route");

const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log(`connected to at ${process.env.DATABASE_URL}`);
    app.listen(process.env.PORT, () => {
      console.log(`connection success at port ${process.env.PORT}  `);
    });
  })
  .catch((err) => {
    console.log("something went wrong ");
    console.log(err.message);
  });
