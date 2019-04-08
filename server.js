const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

const users = require("./routes/api/users");
const images = require("./routes/api/images");
const profile = require("./routes/api/profile");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/images", images);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000; //Heroku or local

app.listen(port, () => console.log(`Server running on port ${port}`));
