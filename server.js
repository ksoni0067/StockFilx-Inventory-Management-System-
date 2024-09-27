var express=require("express");
var app=express();
app.use("/",express.static("./project"));
app.listen(8080);
