// Плеер
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevTrackBtn = document.getElementById('prev-track');
const nextTrackBtn = document.getElementById('next-track');
const trackName = document.getElementById('track-name');

const tracks = ['синяя-сепия.mp3', 'разорвать-небо-руками.mp3', 'I-just-wanna-die.mp3'];
let currentTrackIndex = 0;

function loadTrack(index) {
  audioPlayer.src = tracks[index];
  trackName.textContent = `Сейчас играет: ${tracks[index]}`;
  audioPlayer.play();
}

playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = 'Пауза';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = 'Играть';
  }
});

prevTrackBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
});

nextTrackBtn.addEventListener('click', () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
});

loadTrack(currentTrackIndex);

// Пинг-понг
const canvas = document.getElementById('pong-game');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;

let playerScore = 0, computerScore = 0;
let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;

let playerSpeed = 0;
const paddleSpeed = 8; // Плавное управление

function drawPaddle(x, y) {
  ctx.fillStyle = '#00ff00';
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#00ff00';
  ctx.fill();
  ctx.closePath();
}

function update() {
  // Движение мяча
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Отскок от стен
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Отскок от ракеток
  if (ballX - ballRadius < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > computerY && ballY < computerY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Счет
  if (ballX - ballRadius < 0) {
    computerScore++;
    resetBall();
  }

  if (ballX + ballRadius > canvas.width) {
    playerScore++;
    resetBall();
  }

  // Движение ракетки компьютера (сделаем его слабее)
  computerY += (ballY - (computerY + paddleHeight / 2)) * 0.05;
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  scoreElement.textContent = `${playerScore}:${computerScore}`;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(0, playerY);
  drawPaddle(canvas.width - paddleWidth, computerY);
  drawBall();
  update();
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') playerSpeed = -paddleSpeed;
  if (e.key === 'ArrowDown') playerSpeed = paddleSpeed;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') playerSpeed = 0;
});

document.getElementById('left-btn').addEventListener('click', () => {
  playerY = Math.max(0, playerY - 20);
});

document.getElementById('right-btn').addEventListener('click', () => {
  playerY = Math.min(canvas.height - paddleHeight, playerY + 20);
});

function updatePlayerPosition() {
  playerY += playerSpeed;
  playerY = Math.max(0, Math.min(canvas.height - paddleHeight, playerY));
  requestAnimationFrame(updatePlayerPosition);
}

updatePlayerPosition();
gameLoop();

// ASCII-арт костра и леса
const asciiArt = `
        (  (    (  (          (  (  
     (  )\\ )\\ )\\ )\\ )     (  )\\ )\\ )
     )\\((_|(_|(_|(_|(     )\\((_|(_|
    ((_)_)(_))(_))(_))\\  ((_)_)(_))
    | _ ) || | || | |(_)) | _ ) || |
    | _ \\ __ | __ | '  \\  | _ \\ __ |
    |___/_||_|_||_|_|_|_| |___/_||_|
`;

const asciiElement = document.getElementById('ascii-art');
asciiElement.textContent = asciiArt;

// Анимация ASCII-арта
let frame = 0;
function animateASCII() {
  const frames = [
    asciiArt,
    asciiArt.replace(/\(/g, '[').replace(/\)/g, ']'),
    asciiArt.replace(/\(/g, '{').replace(/\)/g, '}')
  ];
  asciiElement.textContent = frames[frame % frames.length];
  frame++;
  setTimeout(animateASCII, 300);
}

animateASCII();