var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var form = require('express-form');
var field = form.field;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts'));

app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.sendFile('/index.html');
});

app.get('/blog', function(req, res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("connected");
    var dbo = db.db("blog");
    dbo.collection("posts").find({}).project({_id: 0, lastModified: 1, currentDate: 1, title: 1}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.render('blog', {values: result});
      res.end();
      db.close();
    });
  });
});

app.post('/validate', function(req, res){
  if(req.body.name=='Lawrence'&&req.body.password=='L@nCe1994@'){
    console.log("Validation Successful");
    res.sendFile('/admin.html')
  }
  else {
    res.send("Unfortunately, we cannot help you");
  }
});

app.post('/save', form(field("content").trim()), function(req, res){
  var title = req.body.title;
  var content = req.body.content;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myobj = { title: title, content: content, currentDate: new Date()};
    var dbo = db.db("blog");
    dbo.collection("posts").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
// CHECK IF THIS LINE WORKS
  res.send("<div align=\"center\" style=\"margin-top: 20px\">Done</div>")
});


// define all functions

function retrieveList(callback){

};

/*
function loadList(){

  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("connected");
  var dbo = db.db("blog");
  dbo.collection("posts").find({}, (function(err, result) {
      if (err) throw err;
      console.log(result);
      list = result;
      db.close();
    });
  });
}; */

app.listen(8000);
