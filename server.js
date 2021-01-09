const express = require("express");
const mongoose = require("mongoose");
const keys = require("./src/config/keys");
const jobRouter = require("./src/routes/job");

const app = express();

app.use(express.json());

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the Database"))
  .catch(() => {
    console.log("Error connecting the database");
  });

app.use("/job", jobRouter);

app.listen(5000, () => {
  console.log("Server has started at 5000 PORT");
});
