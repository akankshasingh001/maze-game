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
const height = window.innerHeight;

document.querySelector('#btnEasy').addEventListener('click', () => {
  disableGameLevel();
  startGame(5, 5);
});
document.querySelector('#btnMedium').addEventListener('click', () => {
  disableGameLevel();
  startGame(10, 10);
});
document.querySelector('#btnHard').addEventListener('click', () => {
  disableGameLevel();
  startGame(20, 20);
});

disableGameLevel = () => {
  document.querySelector('.gameLevel').classList.add('hidden');
};
