const express = require("express");
const app = express();

const configRoutes = require("./routes");
var cors = require("cors");
app.use(cors());

configRoutes(app);

app.listen(4000, () => {
  console.log("We got a server!");
  console.log("express server now running at localhost:4000");
});
