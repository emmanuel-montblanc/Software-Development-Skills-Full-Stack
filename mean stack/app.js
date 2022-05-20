const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");
const users = require("./routes/users");

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on("connected", () => {
  console.log("connected to database" + config.database);
});

// On error
mongoose.connection.on("error", (err) => {
  console.log("database error" + err);
});

const app = express();

// Port number
const PORT = 3000;

// Cors Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
//app.use(passport.session());

require('./config/passport')(passport);

app.use("/users", users);

// Index route
app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

// Start server
app.listen(PORT, () => {
  console.log("Server start on port " + PORT);
});
