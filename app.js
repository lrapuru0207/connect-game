var express = require("express");
var app = express();

console.log(__dirname);
app.use(express.static(__dirname + "/public"));

var port = 3000;
app.listen(port);
