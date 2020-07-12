const express = require('express')
const app = express()
var methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser");

app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(expressSanitizer());
app.set("view engine", "ejs");


//ROUTES INIT
indexRoutes = require("./routes/index");

//ROUTES USAGE
app.use(indexRoutes);


app.listen(process.env.PORT)