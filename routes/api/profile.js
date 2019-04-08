const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//get user schema
const User = require("../../models/User");

//get profile schema
const Profile = require("../../models/Profile");

// @route  /api/profile/test
// @desc   Tests user route
// @access PUBLIC
router.get("/test", (req, res) => res.json({ msg: "Profile works!" }));

// @route  /api/profile/
// @desc   Get all images associated with current profile
// @access PRIVATE
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) =>
  res.json(null)
);

module.exports = router;
