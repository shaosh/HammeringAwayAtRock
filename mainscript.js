<!--Limit the length of the textarea to 140 letters.-->
function checkLength(str){
	var maxLength = 140;			
	if(str.length > maxLength){
		document.getElementById('statusarea').value = str.substring(0, maxLength);
		alert("Input over limit!");
	}			
	else
		document.getElementById('rest').innerText = maxLength - str.length;			
}
<!--Submit the content in the textarea-->
function submitstatus(){
	var text = document.getElementById('statusarea').value;
	var num = text.length;
	if(num == ""){
		alert("Empty status!");
	}
	else{
		document.getElementById('statustext').innerText = text;	
		var datetime = new Date();
		document.getElementById('statustime').innerText = datetime.toLocaleString() + "\nFrom: " + ip; 
		window.localStorage.setItem('value', text);
	}
}
function updatestatus(){
	var temp = window.localStorage.getItem('value');	
	if(window.localStorage.getItem('value')){
		document.getElementById('statustext').innerText = temp;	
	}
	else 
		document.getElementById('statustext').innerText = "";
}
<!--Drag the selected div to other position-->
var divAndMouseX = 0;
var divAndMouseY = 0;
var divMove = 0;
var initDivX = 0;
var initDivY = 0;
var zmark = 0;
function down(status,ev){			
	if(ev.clientX <= 1280 && ev.clientX >= 0 && ev.clientY <= 3000 && ev.clientY >= 0){
		divMove = status;
		divAndMouseX = ev.clientX - parseInt(divMove.style.left);
		divAndMouseY = ev.clientY - parseInt(divMove.style.top);
		initDivX = divMove.style.left;
		initDivY = divMove.style.top;
		zmark++;
		divMove.style.zIndex = zmark;		
	}
}
function move(ev){			
	if(divMove != 0){
		ev = ev;				
		var mousePos = mouseCoords(ev);	
		if(mousePos.x <= 1280 && mousePos.x >= 0 && mousePos.y <= 3000 && mousePos.y >= 0){
			divMove.style.left = mousePos.x - divAndMouseX + "px";
			divMove.style.top = mousePos.y - divAndMouseY + "px";
		}
		else{
			divMove.style.left = initDivX + "px";
			divMove.style.top = initDivY + "px";
		}
	}
	else
		return false;
}
function up(){
	if(divMove != 0)
		divMove = 0;
}
function mouseCoords(ev){			
	return {x:ev.clientX + document.documentElement.scrollLeft,y:ev.clientY + document.documentElement.scrollTop}
}
<!--audio-->
function selectmusic(){
	musicplayer.src = musiclist.value;
	musicplayer.load();
	playmusic();
}
function playmusic(){
	musicplayer.play();
	playbt.disabled = true;
	pausebt.disabled = false;
}
function pausemusic(){
	musicplayer.pause();
	pausebt.disabled = true;
	playbt.disabled = false;
}
var ip;
function setip(ipstr){
	ip = ipstr;
}
var zip;
function setzip(zipstr){
	zip = zipstr;
}
function getWeather(){
	jQuery(document).ready(function($) {
		$.ajax({
			url: "http://api.aerisapi.com/observations/" + zip + "?client_id=sS77u9StKRiA7dO3A8T2y&client_secret=GIebqi23SRmaDOSHyN74loHvSMjk4ahIefKzNnd2",
			dataType: "jsonp",
			success: function(json) {
				if (json.success == true) {
				   var ob = json.response.ob;
				   document.getElementById('weather').innerText = ob.weather + ",";
				   document.getElementById('temp').innerText = ob.tempF + '°„F';	
				   var iconpath = "WxIcons/" + ob.icon;
				   var image = new Image;
				   document.getElementById('icon').appendChild(image);
				   image.src = iconpath;
				}
				else {
				   alert('An error occurred: ' + json.error.description);
				}
			}
		});
	});
}