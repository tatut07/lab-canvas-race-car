const canvas = document.querySelector("canvas");
canvas.style.border = "2px solid black";
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector(".game-intro");

const background1 = new Image();
background1.src = "../images/road.png";
const background2 = new Image();
background2.src = "../images/road.png";
const car = new Image();
car.src = "../images/car.png";
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const startBtn = document.querySelector(".start-button");

const carStartingPoint = canvasWidth / 2 - 70;
const carSpeed = 5;

const obstacleStartPoint = canvasWidth / 2;

let obstacleX = obstacleStartPoint;
let carX = carStartingPoint;
let carMovement = 0;
let back1 = 0;
let back2 = -canvas.height;
let obstacleMovement = 0;

// let frames = 0;

let isGameOver = false;
let gameId = 0;

const moveCar = () => {
  if (carX + carMovement <= canvasWidth - 70 && carX + carMovement >= 0) {
    carX += carMovement;
  }
};
// class Component {
//   constructor(width, height, color, x, y) {
// this.width = width;
// this.height = height;
// this.color = color;
// this.x = x;
// this.y = y;
// }

// const myObstacles = [];

// function obstacles() {
//   for (i = 0; i < myObstacles.length; i++) {
//     myObstacles[i].x += -1;
//     myObstacles[i].update();
//   }
//   frames += 1;
//   if (frames % 100 === 0) {
//     let x = canvasHeight;
//     let minHeight = 20;
//     let maxHeight = 200;
//     let height = Math.floor(
//       Math.random() * (maxHeight - minHeight + 1) + minHeight
//     );
//     let minGap = 80;
//     let maxGap = 200;
//     let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
//     myObstacles.push(new Component(10, height, "green", x, 0));
//     myObstacles.push(
//       new Component(10, x - height - gap, "green", x, height + gap)
//     );
//   }
// }

const drawObstacle = () => {
  ctx.beginPath();
  ctx.fillStyle = "tomato";
  ctx.fillRect(obstacleX, canvasHeight, 150, 20);
  ctx.closePath();
};
const moveObstacle = () => {
  if (
    obstacleX + obstacleMovement <= canvasHeight &&
    obstacleX + obstacleMovement >= 0
  ) {
    obstacleX += obstacleMovement;
    obstacleMovement += 1;
  } else {
    obstacleX = 2;
  }
};

const animate = () => {
  ctx.drawImage(background1, 0, back1, canvas.width, canvas.height);
  ctx.drawImage(background2, 0, back2, canvas.width, canvas.height);
  ctx.drawImage(car, carX, 500, 70, 140);
  back1 += 2;
  back2 += 2;
  moveCar();
  if (back1 > canvas.height) {
    back1 = -canvas.height - 2;
  }
  if (back2 > canvas.height) {
    back2 = -canvas.height;
  }
  if (isGameOver) {
    cancelAnimationFrame(gameId);
  } else {
    gameId = requestAnimationFrame(animate);
  }
  if (gameId === 2000) {
    isGameOver = true;
  }
  drawObstacle();
  moveObstacle();
  // obstacles();
};
window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    console.log("starting");
    startGame();
  };
};

function startGame() {
  console.log(gameId);
  startScreen.style.display = "none";
  animate();
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      carMovement = -carSpeed;
    }
    if (event.key === "ArrowRight") {
      carMovement = carSpeed;
    }
  });
  document.addEventListener("keyup", () => {
    carMovement = 0;
  });
}
