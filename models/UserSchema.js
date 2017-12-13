var mongoose = require('mongoose');
var bcryqt = require('bcryptjs');
var config = require('../config/database');

const userSchema =mongoose.Schema({
	  name: {
      type:String
    },
    surname:{
      type:String ,
      required: true
    },
    email: {
      type:String ,
      required: true
    },
    username:{
      type:String ,
      required: true,
      unique: true

    },
    password:{
      type:String ,
      required: true
    }

});

const User =module.exports=mongoose.model('User',userSchema);
 
 module.exports.getUserById = function(id,callback){
 	User.findById(id,callback);
 }

 module.exports.getUserByUsername = function(username,callback){
 	const query = {username: username}
 	 User.findOne(query,callback);
 }

 module.exports.addUser = function(newUser,callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err,hash){
      if (err) throw err;
      newUser.password =hash;
      newUser.save(callback);
       
    });

  });
 }