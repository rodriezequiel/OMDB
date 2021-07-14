const router = require("express").Router();
const passport = require('passport')

const { User } = require("../models");

router.post("/register", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(err => res.status(200).json(err.original.detail));
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.get('/me', (req, res) =>{
  if(req.user){
    return res.send(req.user)
  }
  return res.sendStatus(401);
})

module.exports = router;
