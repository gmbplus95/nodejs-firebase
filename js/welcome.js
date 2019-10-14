var isLogged = false;
$(function(){
	if(sessionStorage.getItem('user') != undefined) {
		isLogged = true;
		$("#userId").text(JSON.parse(sessionStorage.getItem('user'))['email']);
	}
	if(!isLogged){
		window.location.href = "../html/index.html";
	};
});
function checkLoginF(){
	if(sessionStorage.getItem('user') == undefined){
		window.location.href = "../html/index.html";
	}
};
function expireSessionStorage(){
	setTimeout(() =>{
		sessionStorage.clear();
	}, 10000);
}
expireSessionStorage();
setInterval(checkLoginF, 2000);
