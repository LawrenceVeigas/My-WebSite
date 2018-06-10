var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {
  $scope.records = function(err, res){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("connected");
    var dbo = db.db("blog");
    dbo.collection("posts").find({}, (function(err, result) {
        if (err) throw err;
        console.log(result);
        return result;
        db.close();
      });
    });
  };
});
