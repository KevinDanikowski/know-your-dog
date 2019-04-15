const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const axios = require("axios");

//get user schema
const User = require("../../models/User");

// Dog model
const Dog = require("../../models/Dog");

const dogBreed = require("../../DogBreeds");

// @route  /api/dogs/test
// @desc   Tests user route
// @access PUBLIC
router.get("/test", (req, res) => res.json({ msg: "Dogs works!" }));

// @route  /api/dogs/save-doginfo
// @desc   Stores dog info to database
// @access PRIVATE
router.post("/save-doginfo", (req, res) => {
  const newDog = new Dog({
    image: req.body.image,
    breed: req.body.breed,
    user: req.user.id
  });

  newDog.save().then(dog => res.json(dog));
});

// @route  /api/dogs/all
// @desc   Get all dogs
// @access PRIVATE
router.get("/all", (req, res) => {
  Dog.find()
    .then(handle404)
    .then(dogs => {
      const dogsObjects = dogs
        .map(dog => dog.toObject())
        .sort((a, b) => (a.priority > b.priority ? -1 : 1));
      const userDogs = [];
      dogsObjects.forEach(dog => {
        if (dog.owner.equals(req.user.id)) {
          userDogs.push(dog);
        }
      });
      return userDogs;
    })
    .then(dogs => res.status(200).json({ dogs: dogs }))
    .catch(err => handle(err, res));
});

// @route  /api/dogs/dog/:id
// @desc   Get individual dog info
// @access PRIVATE
router.get("/dog/:id", (req, res) => {
  Dog.findById(req.params.id)
    .then(handle404)
    .then(dog => res.status(200).json({ dog: dog.toObject() }))
    .catch(err => handle(err, res));
});

// @route  /api/dogs/
// @desc   Post dog info
// @access PRIVATE
router.post(
  "/dogs",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // pulls image from post request to server and sends post request to google API
    const image = req.body.imageUrl;
    var predictions;
    axios({
      method: "post",
      url: "https://vision.googleapis.com/v1/images:annotate",
      params: {
        key: "AIzaSyD3OvnQIWVnRuT3_xD-hto1xk4kn74G3xs"
      },
      headers: {
        Authorization:
          "Bearer ya29.c.El_sBuPIX2XUeALRuqBns5HHTZ0ZX6xlQZc2wtQiPZZaoeHeFIjSeu2sZ4Xd1Chwb8VaNn7KoZ_gGbxF9A7mNLOHiIBFl-SxoYe6_vxS2vP93y9r6XOrA9t7lghK1eTHiA"
      },
      data: {
        requests: [
          {
            image: {
              source: {
                imageUri: req.body.imageUrl
              }
            },
            features: [
              {
                type: "WEB_DETECTION",
                maxResults: 5
              }
            ]
          }
        ]
      }
    })
      .then(function(response) {
        //console.log("response.body", response.body);
        // console.log("****** WEB-DETECTION  DOGS ROUTER *****");

        console.log(response.data.responses[0].webDetection.webEntities);

        var webEntities = response.data.responses[0].webDetection.webEntities;

        predictions = webEntities.map(entity => {
          return entity.description;
        });

        const newDog = new Dog({
          image: req.body.imageUrl,
          description: predictions,
          owner: req.user.id
        });

        newDog.save().then(dog => {
          console.log("dog", dog);
          res.status(200).json({ dog: dog });
        });

        //res.status(200).json({ dog: "dog" });

        //res.status(200).json({ dog: newDog })
        // const descripProbMap = labels.map(label => ({
        //   description: label.description,
        //   probability: label.score
        // }));
        //console.log("descripProbMap", descripProbMap);
        // Check if array of label objects contains any descriptions with the value dog
        // const isDog = function() {
        //   if (
        //     descripProbMap.some(label => label.description.toLowerCase() === "dog")
        //   ) {
        //     return descripProbMap;
        //   } else {
        //     return { description: "Not a dog!" };
        //   }
        // };
        // maps through array of known dog breeds and changes all to lower case to match
        // vision api response
        //const dogBreedLowerCase = dogBreed.map(breed => breed.toLowerCase());
        // function to check if description value from google vision is a known
        // dog breed
        // const breedChecker = function(label) {
        //   if (
        //     dogBreedLowerCase.some(
        //       breed => breed === label.description.toLowerCase()
        //     )
        //   ) {
        //     return label;
        //   }
        // };
        // maps through array of label objects and return key pairs
        // where the key value is a known dog breed
        // const breedCheckerMap = function() {
        //   if (isDog().description !== "Not a dog!") {
        //     return isDog().map(label => breedChecker(label));
        //   }
        // };
        // maps through array of label objects and removes undefined objects
        // const breedCheckerUndefinedFilter = function() {
        //   if (isDog().description !== "Not a dog!") {
        //     return breedCheckerMap().filter(breed => breed !== undefined);
        //   } else {
        //     return isDog();
        //   }
        // };
        // maps through label keys and values and capitalizes all first letters
        // const capitalizer = function(breed) {
        //   return breed
        //     .toLowerCase()
        //     .split(" ")
        //     .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        //     .join(" ");
        // };
        // maps through processed array of label objects and values to be added to new dog
        // const dogDataDisplayReady = function() {
        //   if (breedCheckerUndefinedFilter().length === 0) {
        //     return { description: "Unknown Dog" };
        //   } else if (breedCheckerUndefinedFilter().description === "Not a dog!") {
        //     return breedCheckerUndefinedFilter();
        //   } else {
        //     const capitalizedBreed = breedCheckerUndefinedFilter().map(breed => ({
        //       description: capitalizer(breed.description),
        //       probability: breed.probability * 100
        //     }));
        //     return capitalizedBreed;
        //   }
        // };
        // console.log("response4", dogDataDisplayReady());
        // set owner of new example to be current user
        // req.body.dogs.owner = req.user.id;
        // req.body.dogs.label = dogDataDisplayReady();
        // Dog.create(req.body.dogs)
        //   // respond to succesful `create` with status 201 and JSON of new "dog"
        //   .then(dog => {
        //     res.status(201).json({ dogs: dog.toObject() });
        //   })
        // if an error occurs, pass it off to our error handler
        // the error handler needs the error message and the `res` object so that it
        // can send an error message back to the client
      })
      .catch(function(error) {
        console.log(error);
      });
    res.json({
      id: req.user.id,
      image: req.body.imageUrl,
      description: "predictions"
    });
  }
);

module.exports = router;
