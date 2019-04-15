const express = require("express");
const router = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});

// @route  /api/images/test
// @desc   Tests user route
// @access PUBLIC
router.get("/test", (req, res) => res.json({ msg: "Images works!" }));

router.get("/", (req, res) => res.json({ msg: "Get all images works!" }));

var upload = multer({ storage: storage }).single("image");

router.post("/upload", (req, res) => {
  upload(req, res, function(err) {
    if (err) {
      return res.send("Error Uploading: " + err);
    }

    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: "dowz0jbzx",
      api_key: "455718854117881",
      api_secret: "93J7yX210tphjClZzppH7-zGLWU"
    });

    const path = req.file.path;
    const uniqueFilename = new Date().toISOString();

    cloudinary.uploader.upload(
      path,
      { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
      function(err, image) {
        if (err) return res.send(err);
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details
        res.json(image);
      }
    );
  });
});

module.exports = router;
