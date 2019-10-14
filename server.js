const express = require('express')
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var firebase = require("firebase/app");
app.use(bodyParser.json())
// Add the Firebase products that you want to use
require("firebase/auth");

var firebaseConfig = {
    apiKey: "AIzaSyDYskwSpGEYoLvAUbFJ7Suqpsj1p6BgPqE",
    authDomain: "nodejs-firebase-61367.firebaseapp.com",
    databaseURL: "https://nodejs-firebase-61367.firebaseio.com",
    projectId: "nodejs-firebase-61367",
    storageBucket: "nodejs-firebase-61367.appspot.com",
    messagingSenderId: "42752387923",
    appId: "1:42752387923:web:cb68ddd0796b6728bb8fa6",
    measurementId: "G-KRRHTE36RH"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
app.listen(3000, function () {
  console.log('Firebase app listening on port 3000!')
});

app.post('/login', function (req, res) {
	var email = req.body.username;
	var password = req.body.password;
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(firebaseUser) {
	 var user_logged = {
	  	uid : firebaseUser.user.uid,
	  	email : firebaseUser.user.email
	  }
	  res.json(JSON.stringify(user_logged));
	  res.end();
   })
	.catch(function(error) {
	  console.log(error);
	  res.json(null);
	  res.end();
	});
});
