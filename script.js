let startTime=document.querySelector(".current-time");
let totalDuration=document.querySelector(".total-duration");
let sleekBar=document.querySelector(".sleek-slider");
let diskIcon=document.querySelector(".disk-icon");
let playPause=document.querySelector(".play-btn");
let musicName=document.querySelector(".song-name");
let artist=document.querySelector(".singer");

let currentSong=document.createElement('audio');

let index=0;
let playPauseFlag=true;

// songs stored as array of objects
let songList=[{
    songName: "Raatan Lambiyan",
    artistName: "Jubin Nautiyal",
    songSrc: "resources/RaatanLambiyan.mp3"
},
{
    songName: "Har Har Shambhu",
    artistName: "Abhilipsa Panda, Jeetu Sharma",
    songSrc: "resources/HarHarShambhuShivMahadeva.mp3"

}];

// play song function
function playSong(){
    currentSong.src=songList[index].songSrc;
    currentSong.load();
    musicName.innerText=songList[index].songName;
    artist.innerText=songList[index].artistName;
    if(playPauseFlag)
    {
        currentSong.play();
        diskIcon.classList.add("spin");
        playPauseFlag=false;
    }
    else
    {
        currentSong.pause();
        diskIcon.classList.remove("spin");
        playPauseFlag=true; 
    }
   sleekBarUpdate();

}

// seekbar update function
function sleekBarUpdate(){
    setInterval(() => {
        totalDuration.innerText="0"+Math.round(((currentSong.duration/60)*10))/10;
        sleekBar.maxValue=Math.round(((currentSong.duration/60)*10))/10;
    }, 1000);
    currentSong.addEventListener('timeupdate',function(){
        let currentTime=parseInt(currentSong.currentTime,10);
        let minutes=Math.floor(currentTime/60);
        let seconds=currentTime;

        if(seconds<10 && minutes<10){
            startTime.innerText="0"+minutes+":"+"0"+parseInt(currentSong.currentTime,10);
        }
        else if(seconds>=10){
            startTime.innerText="0"+minutes+":"+parseInt(currentSong.currentTime,10); 
            if(seconds>=60){
              startTime.innerText="0"+minutes+":"+(seconds-(60*minutes));   
            }
        }
      
        sleekBar.value=currentTime;

       
    });
}

// seekbar onclick function
function seekBar(){
    let seekto=(sleekBar.value);
    currentSong.currentTime=seekto;
}

// forword button onclick funtion
function forword(){
    if(index<songList.length-1){
        index++;
    }
    else{
        index=0;
    }
    playPauseFlag=true;
    playSong();
}

// backword button onclick function
function backword(){
    if(index!=0)
    {
        index--;
    }
    else{
        index=songList.length-1;
    }
    playPauseFlag=true;
    playSong();
}

// reset song details function
function resetValues(){
    startTime.innerText="00:00";
    totalDuration.innerText="00:00";
}