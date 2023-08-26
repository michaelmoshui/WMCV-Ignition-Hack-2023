// do not need to change this file, add functions in the controllers folder
// add routes in the routes folder

const express = require("express");
const { readdirSync } = require("fs");
require("dotenv").config();

const app = express();
app.use(express.json());

readdirSync("./routes").map(function (r) {
  app.use("/", require("./routes/" + r));
});

app.get("/", function (req, res) {
  res.send("This is the home page");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}`);
});
