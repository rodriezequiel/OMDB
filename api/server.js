/* eslint-disable no-unused-vars */
const express = require("express");
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const path = require("path");
const volleyball = require('volleyball');

const database = require('./config');
const {User} = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(volleyball);

app.use(session({ 
  secret: "OMDB",
  resave: true,
  saveUninitialized: true
}))

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password'
}, (imputName, imputPassword, done) => {
  User.findOne({
    where: {
      name: imputName
    }
  }).then((user) =>{
    if(!user){
      return done('Datos incorrectos', false);
    }
    user.isValidPassword(imputPassword)
      .then(bool =>{
        if(!bool){
          return done('Datos incorrectos', false);
        }else{
          return done(null, user);
        }
      })
  }).catch(done);
}));

// How we save the user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// How we look for the user
passport.deserializeUser(function(id, done) {
  User.findByPk(id)
    .then(user => done(null, user))
});

app.use("/api", require('./routes'))

app.get("/*", function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname + '/utils', "./404.html"));
});

app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(500).send(err);
});

database.sync()
  .then(()=>{
    console.log('database creada correctamente')
    app.listen(PORT, () => {
      console.log(`Server listening at port http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log(err))
