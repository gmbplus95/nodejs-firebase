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
	checkLoginF();
	checkErrorTime();
	$('#sign-up1').on('click', function(){
		$('#loginForm').css('opacity', '0.5');
		$('#signupForm').css('display', 'inline-block');
		$('#signupForm').css('transition', '2s ease-in');
		$('#signupForm').css('opacity', '1 !important');
		$('#signupForm').css('z-index', '2');
	});
	$('#A').on('click', function(){
		$('#signupForm').css('opacity', '0');
		$('#signupForm').css('z-index', '-1');
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
  		$("#mss").text("username or password not existed");
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
