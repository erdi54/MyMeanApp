var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

const User = require('../models/UserSchema');

/* GET users register. */
router.post('/register', function(req, res, next) {
  let newUser= new User({
     name: req.body.name,
     surname: req.body.surname,
     email: req.body.email,
     username: req.body.username,
     password: req.body.password
  });

User.addUser(newUser,function(err,user){
     if (err){
      res.json({success: false, msg:'Faied to register user'});
     } else{
      res.json({success:true, msg:'User Register'});	
     }
  });

});

/* GET users authenticate. */
router.post('/authenticate', function(req, res, next) {
  res.send('authenticate');
});

/* GET users profile. */
router.get('/profile', function(req, res, next) {
  res.send('profile');
});

/* GET users validate. */
router.get('/validate', function(req, res, next) {
  res.send('validate');
});


module.exports = router;
