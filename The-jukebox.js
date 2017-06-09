
document.addEventListener("DOMContentLoaded", function(event) { 

  //do work

  	var vid = document.getElementById("myAudio");
  	var a = 0;
  	playAud = function(){
  		 vid.play();
  	}
  	pauseAud = function(){
  		 vid.pause();
  	}
  	previous = function(){
  		document.getElementById("mp3-src").src = "audio/letme.mp3";
  		document.getElementById("myAudio").load();
  	}
  	next = function(){
  		document.getElementById("mp3-src").src = "audio/moorim-school.mp3";
  		document.getElementById("myAudio").load();
  	}
  	onHover = function(){
  		previous();
  	}
  	onHover2 = function(){
  		next();
  	}
  
});



// $( document ).ready(function() {
// 	var vid = document.getElementById("myAudio");
// 	playAud = function(){
// 		vid.play();
// 	}
// 	pauseAud =function(){
// 		vid.pause();
// 	}

// });
