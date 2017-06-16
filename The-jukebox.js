
document.addEventListener("DOMContentLoaded", function(event) { 

  
  
  document.getElementById('submit').addEventListener("click", function( innerEvent ) {
    var ss = document.getElementById("searchMusic").value;   
    search(ss);
  });
  document.getElementById('myOl').addEventListener("click", function(e) {
       if(e.target && e.target.nodeName == "BUTTON") {
        console.log(e.target.id + " was clicked");
        getTrackFile(e.target.id);
        // playlist();
      }
    });
  // $('#playlist').find('a').click(function(e){
  //   e.preventDefault();
  //   playlist();
  // })



  var Jukebox = function(){
  	var vid = document.getElementById("myAudio");
  	var a = 0;
  	this.playAud = function(){
     vid.play();
   }
   this.pauseAud = function(){
     vid.pause();
   }
   
  }//jukebox

  myJukebox = new Jukebox();

  document.getElementById('play-button').addEventListener("click", function( innerEvent ) {
    myJukebox.playAud();
  });
  document.getElementById('pause').addEventListener("click", function( innerEvent ) {
    myJukebox.pauseAud();
  });
  // document.getElementById('previous').addEventListener("click", function( innerEvent ) {
  //   myJukebox.previous();
  // });
  // document.getElementById('next').addEventListener("click", function( innerEvent ) {
    // myJukebox.next(innerEvent);
  // });

  // document.getElementById("pr").onmouseover = function() {
  //   myJukebox.next()
  // };

  // document.getElementById("nx").onmouseover = function() {
  //   myJukebox.previous()
  // };


  var data;
  function search(searchTerm){
    var searchUrl = "https://freemusicarchive.org/api/trackSearch?q=";
    var limit = 10;
    $.getJSON(searchUrl+searchTerm+"&limit="+limit, function(result){
      data = result;
      $("#myOl").empty();

       var items = [];
       $.each(result.aRows, function(i, field){
         items.push("<li>" +" "+ field +" <button id =\""+i+"\""+ "class="+"load"+"> Add to playlist</button>"+"</li>");
        // $("#myOl").append("<li "+"id=\""+i+"\">" +" "+ field +"</li>");
      });
       $("#myOl").append(items.join(''));
     });

  }//search
  
  
 
  
  function getTrackFile(songNumber){

   var dataset = data.aRows[songNumber];
   var sName = dataset;       

       //filtering the track id
       var patt1 = /\(\d+\)/g;
       var patt2 = /\d+/g;
       var result = dataset.match(patt1);
       var fresult = result[0].match(patt2);
       var tid = fresult[0];

       // var tid = 7173
       var trackUrl = "https://freemusicarchive.org/api/get/tracks.json?";
       var fileurl = 'https://files.freemusicarchive.org/';

       $.get(trackUrl + "api_key=ZEE75AK7GUEX5YF0"+ "&track_id=" + tid, function(data){
         var json = $.parseJSON(data);
         var dataset = json.dataset;

         var file = fileurl+dataset[0].track_file;
         var image = dataset[0].track_image_file;

         console.log(fileurl + file);
         console.log(image);
          // var items = [];
          var songFile = file;

          $("#playlist").find("#reset").click(function(e){
               $("#playlist li").slice(1).remove();
               // $("#playlist").append("<li class=\"active\">\r\n\r\n\t\t\t\t\t<a class=\"inner\" href=\"http:\/\/www.soundjay.com\/communication\/sounds\/tape-recorder-eject-1.mp3\">\r\n\t\t\t\t\t\t<button>Load to player<\/button>\r\n\t\t\t\t\t<\/a><button id=\"reset\"> Reset<\/button>\r\n\r\n\t\t\t\t<\/li>");
          });
          
          $("#playlist").append("<li><a src=\""+image + "\" href=\""+songFile+"\">"+sName+"</a></li>"); 
          

         // $('#mp3-src').prop('src',file)
         // $('#myAudio')[0].load();
         // $('#myAudio')[0].play();
       })

   }//getTrackFile




  //playlist function
  var playlist = function(){
   var audio;
   var playlist;
   var tracks;
   var link;
   var current;
   


   current = 0;



   audio = $('#myAudio');
   playlist = $('#playlist');
   tracks = playlist.find('li a');
   var len = tracks.length;
   console.log("outside: "+len+" current:"+current);
   audio[0].volume = .50;
   audio[0].play();
   //play selected.
   playlist.find('a').click(function(e){
    e.preventDefault();
    link = $(this);
    console.log("origin: "+link);
    current = link.parent().index();
    run(link, audio[0]);
  });//find


   $('body').find('#next').click(function(e){

      ++current;
    
      if(current < len){
        link = playlist.find('a')[current];   
        run($(link),audio[0]);
    }
      console.log("runsn");
    });
   $('body').find('#previous').click(function(e){

      --current;
    
      if(current < len){
        link = playlist.find('a')[current];   
        run($(link),audio[0]);
      }
      console.log("runsp");
    });

  //autoplay 
  audio[0].addEventListener('ended',function(e){
    ++current;
    console.log("runs ended listener");
    console.log(len+" current:"+current);
    if(current < len){
      link = playlist.find('a')[current];   
      run($(link),audio[0]);
    }
  });//ended listener


  //load song
  var run = function(link, player){
        player.pause();
        player.src = link.attr('href');
        var a = link.attr('src');
        console.log(a);
        
        $("#cover").attr('src', a);
        var par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
      }//run
  }//playlist

  //playlist function call on any song press.
  $('#playlist').find('a').click(function(e){
    e.preventDefault();
    playlist();
  })
  
});//document ready

