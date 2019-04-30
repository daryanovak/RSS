import dataImage from './dataImage.mjs';
import move from './move.mjs';
import transform from './transform.mjs';
import paintBucket from './paintBucket.mjs';
import chooseColor from './chooseColor.mjs';

const menu = document.getElementsByClassName('pallete__option')[0];
let currentToolCallback;

function setCanvasStyle(style, i, rowNumber) {
  const newStyle = style;
  newStyle.position = 'absolute';
  newStyle.left = `${505 + 215 * ((i - 1) % 3)}px`;
  newStyle.top = `${20 + 215 * (rowNumber - 1)}px`;
}

function generateCanvasArea() {
  const canvasArea = document.getElementsByClassName('pallete__canvas-area')[0];
  let rowNumber = 1;
  let canvas;
  for (let i = 1; i < 10; i += 1) {
    canvas = document.createElement('canvas');
    setCanvasStyle(canvas.style, i, rowNumber);
    canvasArea.appendChild(canvas);
    if (i % 3 === 0) {
      rowNumber += 1;
    }
  }
}

generateCanvasArea();

menu.addEventListener('click', (e) => {
  if (e.target.classList.contains('pallete__tools__paint-bucket')) {
    paintBucket();
  }

  if (e.target.classList.contains('pallete__tools__choose-color')) {
    chooseColor();
  }

  if (e.target.classList.contains('pallete__tools__move')) {
    move();
  }

  if (e.target.classList.contains('pallete__tools__transform-button')) {
    transform();
  }
});


function addButtonsListener(e) {
  const evtobj = window.event || e;
  if (evtobj.keyCode === 90 && evtobj.ctrlKey) { // ctrl + z
    paintBucket();
  }
  if (evtobj.keyCode === 88 && evtobj.ctrlKey) { // ctrl + x
    chooseColor();
  }
  if (evtobj.keyCode === 67 && evtobj.ctrlKey) { // ctrl + c
    move();
  }
  if (evtobj.keyCode === 86 && evtobj.ctrlKey) { // ctrl +v
    transform();
  }
}

window.addEventListener('keydown', addButtonsListener);
