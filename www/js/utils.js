const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body,
  Events,
  MouseConstraint,
  Mouse
} = Matter;

const width = window.innerWidth;
const height = window.innerHeight * 0.9;

document.querySelector('#btnEasy').addEventListener('click', () => {
  disableGameLevel();
  startGame(8, 8);
});
document.querySelector('#btnMedium').addEventListener('click', () => {
  disableGameLevel();
  startGame(10, 10);
});
document.querySelector('#btnHard').addEventListener('click', () => {
  disableGameLevel();
  startGame(16, 16);
});

disableGameLevel = () => {
  document.querySelector('.gameLevel').classList.add('hidden');
};
