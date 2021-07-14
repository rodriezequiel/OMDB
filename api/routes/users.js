const router = require("express").Router();

const { User } = require("../models");

router.get('/', (req, res) =>{
  User.findAll()
    .then(data => res.json(data))
})

module.exports = router;