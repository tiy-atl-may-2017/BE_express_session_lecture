const express = require("express");
const bodyParser = require("body-parser");
const validator = require("express-validator");
const mustacheExpress = require("mustache-express");
const path = require("path");
const session = require("express-session");

// Initialze Express App
const app = express();

// Serve static files to server
app.use(express.static(path.join(__dirname, "public")));

// Setting up View Engine
app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

// Body parser and validator implementation
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator());

// Initialize Express Session
app.use(session({
  secret: 'asdfasdf',
  resave: false,
  saveUninitialized: false
}));

// "/" Endpoint
app.get("/", function(req, res) {
  if (req.session.username) {
    res.redirect("/user");
  } else {
    res.render("index");
  }
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  req.session.username = req.body.username;

  res.redirect("/user");
});

app.get("/user", function(req, res) {
  res.render("user", {username: req.session.username});
});

app.listen(8080, function() {
  console.log("App is running on localhost:8080");
});


















/// ALILILA LIAL ILAILIA ALI
