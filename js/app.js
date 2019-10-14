var checkLogin = false;
var errorTime = 0;
var user = {};

function checkLoginF(){
	if(checkLogin && sessionStorage.getItem('user') != undefined){
		window.location.href = "../html/welcome.html";
	}
};

function checkErrorTime(){
	var count = parseInt($("#count").text());
	if(count > 0){
	$("#btn-sub").prop('disabled', true);
	$("#log_false").css('display', 'inline-block');
	var c = setInterval(function(){
				count--;
				$("#count").text(count);
				if(count ==0 ){
					clearInterval(c);
					$("#log_false").css('display', 'none');
					$("#btn-sub").prop('disabled', false);
				};
			}, 1000);
		}	
}


$(function() {
	var config = {
        apiKey: "AIzaSyDYskwSpGEYoLvAUbFJ7Suqpsj1p6BgPqE",
		authDomain: "nodejs-firebase-61367.firebaseapp.com",
		databaseURL: "https://nodejs-firebase-61367.firebaseio.com",
		projectId: "nodejs-firebase-61367",
		storageBucket: "nodejs-firebase-61367.appspot.com",
		messagingSenderId: "42752387923",
		appId: "1:42752387923:web:cb68ddd0796b6728bb8fa6",
		measurementId: "G-KRRHTE36RH"
    };
    firebase.initializeApp(config);
	checkLoginF();
	checkErrorTime();
	$('#sign-up1').on('click', function(){
		$('#loginForm').css('opacity', '0.3');
		$('#signupForm').css('opacity', '1', 'important');
		$('#signupForm').css('display', 'inline-block');
		$('#signupForm').css('transition', 'all 1s ease-in');
		$('#signupForm').css('z-index', '2');
		$('#mask').css('z-index', '1');
	});

	$('#mask').on('click', function(){
		$('#loginForm').css('opacity', '1');
		$('#loginForm').css('z-index', '0');
		$('#signupForm').css('opacity', '0');
		$('#signupForm').css('z-index', '-2');
		$('#signupForm').css('transition', 'all 1s ease-out');
		$('#mask').css('z-index', '-1');
	});
	// var provider =;
	$('#google').on('click', function(){
		//Google singin provider
		firebase.auth().signInWithRedirect( new firebase.auth.GoogleAuthProvider()).then(function(result) {
			console.log('aaaaaaaaaaaaaaaa');
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// ...
		  }).catch(function(error) {
			console.log('bbbbbbbbbbbbbbbbb');
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		  });
	});
});

function hidemss (){
	$("#mss").css('display', 'none');
}

$("#loginForm").submit(function(event) {
  event.preventDefault();
  var username = $("#username").val();
  var pass = $("#pass").val();
  var user_input = {
  	username: username,
  	password: pass
  };
  var isSuccess = false;
  $.ajax({
            url: 'http://localhost:3000/login',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            async: false,
            data: JSON.stringify(user_input),
            success: function(data){ 
            	if(data != null){
            		user = JSON.parse(data);
            		isSuccess= true;
            	}
           
            }
        });
  if(isSuccess) {
  	checkLogin = true;
  	sessionStorage.setItem('user', JSON.stringify(user));
  	sessionStorage.setItem('errorTime', 0);
  	checkLoginF();
  }
  else {
  		$("#mss").css('display', 'block');
  		$("#mss").text("error : username or password not existed");
	  	$("#mss").css('color', 'red');
	  	$("#mss").css('font-size', '20px');
	  	$("#mss").css('margin-left', '100px');
	  	$("#mss").css('margin-top', '10px');
	  	if(sessionStorage.getItem('errorTime')  != undefined){
	  		errorTime = parseInt(sessionStorage.getItem('errorTime')) + 1;
	  	}
	  	else errorTime++;
	  	sessionStorage.setItem('errorTime', errorTime);
	  	if(parseInt(sessionStorage.getItem('errorTime')) >= 3){
	  		$("#count").text('10');
	  		errorTime = 0;
	  		sessionStorage.setItem('errorTime', errorTime);
	  		checkErrorTime();
	  	}
	}
  }
);


$("#signupForm").submit(function(event) {
	event.preventDefault();
	var username = $("#username-s").val();
	var pass = $("#pass-s").val();
	var user_input = {
		username: username,
		password: pass
	};
	var isSuccess = false;
	var errormss = '';
	$.ajax({
			  url: 'http://localhost:3000/signup',
			  type: 'post',
			  dataType: 'json',
			  contentType: 'application/json',
			  async: false,
			  data: JSON.stringify(user_input),
			  success: function(data){ 
				  if(data != null){
					  console.log(data)
					  if(JSON.parse(data)['message'] !== undefined){
						errormss = JSON.parse(data)['message'];
					  }
					  else {
						user = JSON.parse(data);
						isSuccess= true;
					  }
				  }
			 
			  }
		  });
		if(isSuccess) {
			alert('Sign up succesfully');
			}
		console.log(errormss)
		if (errormss !== ''){
			$("#errormss").css('display', 'inline-block');
			$("#errormss").text(errormss);
			$("#errormss").css('color', 'red');
		}
	}
	
  );
function hideerrormss (){
	$("#errormss").css('display', 'none');
}