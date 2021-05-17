const MongoClient = require("mongodb").MongoClient;

const mongoConfig = {
  serverUrl: "mongodb://localhost:27017/",
  database: "liquidData",
};

const uri = "mongodb+srv://liquidappteam:PatrickHill554@cluster0.5uigu.mongodb.net/liquidDatabase?retryWrites=true&w=majority"

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://liquidappteam:<password>@cluster0.5uigu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


//mongodb+srv://liquidappteam:<password>@cluster0.5uigu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
