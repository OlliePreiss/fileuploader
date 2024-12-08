const express = require("express");
const session = require("express-session");
const path = require("node:path");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const pool = require('./db/pool')

const app = express();
app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.render('index'))

app.listen(3005);
