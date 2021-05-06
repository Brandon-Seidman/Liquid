const posts = require("./posts");
const users = require("./users");

const constructorMethod = (app) => {
  app.use("/users", users);
  app.use("/posts", posts);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not Found" });
  });
};

module.exports = constructorMethod;
