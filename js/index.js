
for (i = 0; i < 20; i++) {
  var def=$('.board').append('<div class="disc disc-' + i + '" style="transform: translateZ(-' + i + 'px)"</div>');
}
$('.disc-0').addClass('head');
$('.disc-19').addClass('back');

var id, color, j, audio, players=[], radid, val, glow, random, noglow, times, player=0, comp, cutsimon=[], k, i=0, clickedstrict = false, clickedonoff= true, startstop=false,  time, len;
var simon=[];
var pads = document.getElementsByClassName("pad");

function makeitlive(val) {
  console.log('makeitlive-startstop'+startstop);
    if(startstop==true){
       return;
       }
     color=$("#"+val).attr("class").split(" ")[1];
     audio = document.getElementsByTagName("audio")[val];
     audio.load();
     audio.play();
     glow=document.getElementById(val).classList.add("glow-"+color);
}
function getRandomInt(max) {
  random=Math.floor(Math.random() * Math.floor(4));
   simon.push(String(random));
    console.log('simon:'+simon);
  return simon;
}
function playsimon() {
  console.log('playsimon-startstop'+startstop);
    if(startstop==true){
       return;
       }
      cutsimon.length=0;
      k++;
   console.log('1.k-playsimon:'+k);
   if(k<10){
      $(".display").text('0 '+k);
   }else{
      $(".display").text(k);
   }
   cutsimon=simon.slice(0,k);
   console.log('2.cutsimon: '+cutsimon);
   var id = -1;
   len=cutsimon.length;
 var interval = setInterval(function() { 
    if (id < len) {
     id++;
     console.log('1.radid'+radid);
     radid=cutsimon[id];
     console.log('2.radid'+radid);
     makeitlive(radid); 
   }
   else { 
      clearInterval(interval);
   }
}, 2200);
    var idrem = -1;
 var interval = setInterval(function() { 
   if (idrem < cutsimon.length) { 
     idrem++;
     radid=cutsimon[idrem];
     color=$("#"+radid).attr("class").split(" ")[1];
     var noglow= document.getElementById(radid).classList.remove("glow-"+color);  
     noglow;
     //audio = document.getElementsByTagName("audio")[radid];
    // audio.pause();
   }
   else { 
      clearInterval(interval);
   }
}, 2300);
   console.log('3.cutsimon.length-k: '+cutsimon.length+k);
   if(k==cutsimon.length){
         youplayer();
         players.length=0;
      }
 }
function youplayer(){ 
  console.log('youplayer-startstop'+startstop);
    if(startstop==true){
       return;
       }
   for(j = 0; j<pads.length; ++j){
     pads[j].onmousedown = function() {
     id=pads[j];
     makeitlive(this.id);
     players.push(this.id);
     console.log('?players: '+players);
    }
    pads[j].onmouseup = function() {
      this.classList.remove("glow-"+color);
      //audio = document.getElementsByTagName("audio")[this.id];
      //audio.pause();
    }    
   }
  time=5000;
  if(k>0){
    time=5000*k;
  }
  setTimeout( function(){
     console.log('4.players.length-k: '+players.length+k);
     cutsimon=simon.slice(0,k);
    console.log('5.youplayer-players+cutsimon: '+players+cutsimon);
    console.log('6.JSON.stringify(cutsimon)'+JSON.stringify(cutsimon));
    console.log('7.JSON.stringify(players)'+JSON.stringify(players));
    console.log('8.JSON.stringify(simon)'+JSON.stringify(simon));
    var comp=JSON.stringify(cutsimon) === JSON.stringify(players);  
    console.log('9.comp'+comp);
    if(players.length===k && comp==true){
    playsimon();
     }else if(clickedstrict===true && comp==false){
         start();
    }else{
       k=k-1;
       playsimon();
     }
  }, time);   
}
function strict(){
    if (clickedstrict) {
      $('.strict').removeClass('active');
        clickedstrict=false;
    } else {
      $('.strict').addClass('active');
        clickedstrict=true;
    }
}
function onoff(){
    if (clickedonoff) {
    $(".display").addClass('display-turnedoff');
    $(".display").html("-&nbsp;&nbsp;-");
       startstop=true;
       clickedonoff=false;
    } else {
     $(".display").removeClass('display-turnedoff');
        startstop=false;
        clickedonoff=true;
    }
}
var buttonstrict = document.getElementById("strict");
var buttonstart = document.getElementById("start");
var clickBtn = document.getElementById("switch1");

// Disable the button on initial page load
buttonstrict.disabled = false;
buttonstart.disabled = false;

//add event listener
clickBtn.addEventListener('click', function(event) {
    buttonstrict.disabled = !buttonstrict.disabled;
    buttonstart.disabled = !buttonstart.disabled;
    $("#start").addClass('no-hover');
    $("#strict").addClass('no-hover');
});

buttonstart.addEventListener('click', function(event) {
    $("#start").removeClass('no-hover');
});
buttonstrict.addEventListener('click', function(event) {
    $("#strict").removeClass('no-hover');
});
function repeat(fn, times) {
  var loop = function (times) {
    if (times) {
      fn(times);
      loop(--times);
    }
  }
  loop(times);
}
function start() {
  repeat(getRandomInt, 19);
  k=0;
  $(".display").text('0 '+k);
  console.log('simon-start: '+simon);
  playsimon();
}