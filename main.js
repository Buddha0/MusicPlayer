const play = document.querySelector(".fa-play");
let audio_element = document.querySelector(".audio");
const gif = document.getElementById("gif");
const container = document.querySelector(".container");
const input = document.querySelector("input");
const song_title = document.querySelector(".main-heading");
const song_singer = document.querySelector(".sub-heading");
const next_btn = document.querySelector(".fa-forward")
const prev_btn = document.querySelector(".fa-backward")
const currentSongTime = document.querySelector(".current-time")
const endingTime = document.querySelector(".total-time")

const songs = [
  {
    title:"Leavn Polkka",
  
    audio:"images/catVibing.mp3",
    gif:"images/cat-vibing-vibing-cat.gif"
  },
  {
    title:"Never Gonna Give Up",
    singer:"Rick Astley",
    audio:"images/never.mp3",
    gif:"images/rickroll-roll.gif"
  },
  {
    title:"Chicken Song",
    singer:"J.Geco",
    audio:"images/chicken.mp3",
    gif:"images/techno-chicken.gif"
  },
 
]

let currentIndex = 0
isPlaying = false

function updateDOM(songs){
  song_title.innerHTML = songs.title
  song_singer.innerHTML = songs.singer? songs.singer : "unknown" 
  gif.src = songs.gif
  audio_element.src = songs.audio

}

play.addEventListener("click",()=>{
isPlaying = !isPlaying
isPlaying ? playSong() : pauseSong()
})

function playSong(){
  play.classList.replace("fa-play", "fa-pause")
  audio_element.play()
}
function pauseSong(){
  play.classList.replace("fa-pause", "fa-play")
  audio_element.pause()
}

function nextSong(){
  currentIndex = (currentIndex + 1) % songs.length
  updateDOM(songs[currentIndex])
  if(isPlaying){
    audio_element.play()
  }

}
 

prev_btn.addEventListener("click",()=>{

  if(currentIndex === 0){
    currentIndex = songs.length - 1
  }else{
    currentIndex-- 
  }
  updateDOM(songs[currentIndex])
  if(isPlaying){
    audio_element.play()
  }
})

updateDOM(songs[currentIndex])


audio_element.addEventListener("timeupdate",(e)=>{
  const {currentTime, duration} = e.srcElement;
input.value = (currentTime/duration) * 100
updateCurrentTimeDisplay(currentTime)


})

function updateCurrentTimeDisplay(currentTime) {
 
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const secondsDisplay = seconds < 10 ? `0${seconds}` : `${seconds}`;
  currentSongTime.innerHTML = `${minutes}:${secondsDisplay}`;
}

input.addEventListener("input", (e) => {
  const progress = e.target.value;
  const seekTime = (progress / 100) * audio_element.duration;
  audio_element.currentTime = seekTime;
});


next_btn.addEventListener("click",nextSong)
audio_element.addEventListener("ended", nextSong)