const easyLevel = document.querySelector('#btnEasy').value;
const mediumLevel = document.querySelector('#btnMedium').value;
const hardLevel = document.querySelector('#btnHard').value;
let playingLevel = '';

gameStart = playingLevel => {
  document.querySelector('#btnEasy').addEventListener('click', () => {
    playingLevel = easyLevel;
    console.log(playingLevel);
    document.querySelector('canvas').classList.remove('hidden');
  });
  document.querySelector('#btnMedium').addEventListener('click', () => {
    playingLevel = mediumLevel;
    document.querySelector('canvas').classList.remove('hidden');
  });

  document.querySelector('#btnHard').addEventListener('click', () => {
    playingLevel = hardLevel;
    document.querySelector('canvas').classList.remove('hidden');
  });
};

switch (playingLevel) {
  case 'Easy':
    cellsHorizontal = 5;
    cellsVertical = 5;
    break;
  case 'Medium':
    cellsHorizontal = 15;
    cellsVertical = 15;
    break;
  case 'Hard':
    cellsHorizontal = 20;
    cellsVertical = 20;
    break;
  default:
    cellsHorizontal = 3;
    cellsVertical = 3;
    break;
}
