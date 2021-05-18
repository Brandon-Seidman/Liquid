const express = require("express");
const app = express();

const configRoutes = require("./routes");
var cors = require("cors");
app.use(cors({origin: true, credentials: true}));

configRoutes(app);

const port = process.env.HTTP_PORT || 443;

app.listen(port, () => {
  console.log("We got a server!");
  console.log("express server now running at localhost:443");
});
