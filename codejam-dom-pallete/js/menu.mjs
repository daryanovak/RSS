import dataImage from './dataImage.mjs';
import move from './move.mjs';
import transform from './transform.mjs';
import paintBucket from './paintBucket.mjs';
import chooseColor from './chooseColor.mjs';
import generateCanvasArea from './setCanvas.mjs';

const menu = document.getElementsByClassName('pallete__option')[0];

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
