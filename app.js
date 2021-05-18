const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const configRoutes = require("./routes");
var cors = require("cors");
app.use(cors());

configRoutes(app);

io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})

server.listen(4000, () => {
  console.log("We got a server!");
  console.log("express server now running at localhost:4000");
});
