const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
const sounds = document.querySelectorAll(".sound-picker button");

// Отображение времени
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
// Продолжительность
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 0;
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;


sounds.forEach(sound => {
    sound.addEventListener('click', function(){
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
    });
});

// сброс таймера
 play.addEventListener('click', () => {
        checkPlaying(song);
    });

  replay.addEventListener("click", function() {
      restartSong(song);
    });
  
  
  const restartSong = song =>{
      let currentTime = song.currentTime;
      song.currentTime = 0;
  }
   
//Выбор 
    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        });
    });

//функция для остановки и воспроизведения
const checkPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

// Анимация круга
 song.ontimeupdate = function() {
     let currentTime = song.currentTime;
     let elapsed = fakeDuration - currentTime;
     let seconds = Math.floor(elapsed % 60);
     let minutes = Math.floor(elapsed / 60);
     //Логика анимации
     let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
     outline.style.strokeDashoffset = progress;
     timeDisplay.textContent = `${minutes}:${seconds}`;

     if(currentTime >= fakeDuration) {
         song.pause();
         song.currentTime = 0;
         play.src = "./svg/play.svg";
     }
 };
