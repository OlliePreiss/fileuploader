const express = require("express");
const path = require("node:path");

const session = require('./config/session');
const passport = require('./config/passport')
const indexRouter = require('./routes/indexRouter')

const app = express();
app.use(express.static('public'));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Session
app.use(session);
// Passport
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter)

app.listen(3005);
