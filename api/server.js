const express = require('express');
const bodyParser = require('body-parser');

GLOBAL = {};
GLOBAL.ObjectID = require('mongodb').ObjectID;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//include the routes
var userRouter = require('./routes/user');
app.use('/user', userRouter);

// Configuring the database
var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err
  GLOBAL.db = client.db('cs380')
  console.log("Established database connection.");
})

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000.");
});
