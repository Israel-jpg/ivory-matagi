const compliments = [
  "I js cant get over how gorgeous you look😍💕",
  "You’re not just my girl youre my peace, my happiness, my everything ❤",
  "You prove to me everyday that love is real 💖",
  "You make me smile without even trying ❤",
  "You have the biggest heart ever🌹",
  "You got me addicted fr like I can’t go a day without needing you 😩",
  "Everyday is a blessing knowing i have you in my life 💕"
];

const songs = [
  "song1.mp3",
  "song2.mp3",
  "song3.mp3",
  "song4.mp3",
  "song5.mp3",
  "song6.mp3",
  "song7.mp3"
];

function dailyIndex() {
  return new Date().getDay();
}

let music;               
let musicStarted = false; 
let fadeInterval = null;

function initMusic() {
  music = document.getElementById("bgMusic");
  music.src = songs[dailyIndex()];
  music.loop = true; 
}

function playMusicWithFade() {
  if (musicStarted) {
    if (music.paused) {
      music.play().catch(err => console.log("Resume blocked:", err));
    }
    return;
  }

  music.volume = 0;
  music.play().then(() => {
    musicStarted = true;
    if (fadeInterval) clearInterval(fadeInterval);
    let vol = 0;
    fadeInterval = setInterval(() => {
      vol = Math.min(1, vol + 0.05);
      music.volume = vol;
      if (vol >= 1) clearInterval(fadeInterval);
    }, 200);
  }).catch(() => {
    console.log("Autoplay blocked; will start on click.");
  });
}

function showCompliment() {
  const index = dailyIndex();
  const compliment = compliments[index];
  const complimentText = document.getElementById("complimentText");

  complimentText.classList.remove("show");
  void complimentText.offsetWidth; // force reflow
  complimentText.innerText = compliment;
  complimentText.classList.add("show");

  playMusicWithFade();
}

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤";
  const colors = ["#ff4d6d", "#ff99cc", "#ff1744", "#f50057", "#d500f9"];
  heart.style.color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 15) + "px";
  heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

window.addEventListener("load", () => {
  initMusic();
  playMusicWithFade();
});
