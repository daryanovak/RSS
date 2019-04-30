import dataImage from './dataImage.mjs';

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


function paintBucket() {
  const canvasArea = document.getElementsByClassName('pallete__canvas-area')[0];
  const pallette = document.getElementsByClassName('pallete__color-canvas-picker')[0];

  pallette.removeEventListener('click', currentToolCallback);

  const currentColor = document.getElementsByClassName('pallete__colors-option__current-color')[0];

  canvasArea.removeEventListener('click', currentToolCallback);
  canvasArea.removeEventListener('mousedown', currentToolCallback);


  currentToolCallback = (e) => {
    const event = e || window.event;
    const target = event.CurrentTarget || event.srcElement;
    if (target.tagName === 'CANVAS') {
      const style = getComputedStyle(currentColor);
      const bgColor = style.backgroundColor;
      target.style.backgroundColor = bgColor;
    }
  };

  canvasArea.addEventListener('click', currentToolCallback);
}

function chooseColor() {
  const canvas = document.getElementsByClassName('pallete__color-canvas-picker')[0];
  const canvasArea = document.getElementsByClassName('pallete__canvas-area')[0];

  canvasArea.removeEventListener('click', currentToolCallback);


  function getPosition(obj) {
    let resultObj = obj;
    let curleft = 0;
    let curtop = 0;
    if (resultObj.offsetParent) {
      do {
        curleft += resultObj.offsetLeft;
        curtop += resultObj.offsetTop;
      } while (resultObj = resultObj.offsetParent);
      return { x: curleft, y: curtop };
    }
    return undefined;
  }

  function drawImageFromWebUrl(sourceurl) {
    const img = new Image();

    img.addEventListener('load', () => {
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    });

    img.setAttribute('src', sourceurl);
  }

  drawImageFromWebUrl(dataImage());
  currentToolCallback = (e) => {
    const pos = getPosition(e.target);
    const x = e.pageX - pos.x;
    const y = e.pageY - pos.y;
    const c = e.target.getContext('2d');
    const p = c.getImageData(x, y, 1, 1).data;

    const currentColor = document.getElementsByClassName('pallete__colors-option__current-color')[0];
    const prevColor = document.getElementsByClassName('pallete__colors-option__prev-color')[0];
    const cur = getComputedStyle(currentColor);
    const bgColor = cur.backgroundColor;
    prevColor.style.backgroundColor = bgColor;
    currentColor.style.backgroundColor = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
  };
  canvas.addEventListener('click', currentToolCallback);
}

function move() {
  const canvasArea = document.getElementsByClassName('pallete__canvas-area')[0];
  const pallette = document.getElementsByClassName('pallete__color-canvas-picker')[0];

  pallette.removeEventListener('click', currentToolCallback);

  canvasArea.removeEventListener('click', currentToolCallback);
  canvasArea.removeEventListener('mousedown', currentToolCallback);
  pallette.removeEventListener('click', currentToolCallback);

  currentToolCallback = (e) => {
    const event = e || window.event;
    const target = event.CurrentTarget || event.srcElement;
    function moveAt(moveEvent) {
      target.style.left = `${moveEvent.pageX - target.offsetWidth / 2}px`;
      target.style.top = `${moveEvent.pageY - target.offsetHeight / 2}px`;
    }
    if (target.tagName === 'CANVAS') {
      target.style.position = 'absolute';
      moveAt(e);

      target.style.zIndex = 1000;
      document.onmousemove = (moveEvent) => {
        moveAt(moveEvent);
      };

      target.onmouseup = () => {
        document.onmousemove = null;
        target.onmouseup = null;
      };
    }
  };
  canvasArea.addEventListener('mousedown', currentToolCallback);
}

function transform() {
  const canvasArea = document.getElementsByClassName('pallete__canvas-area')[0];
  const pallette = document.getElementsByClassName('pallete__color-canvas-picker')[0];

  pallette.removeEventListener('click', currentToolCallback);
  canvasArea.removeEventListener('click', currentToolCallback);
  canvasArea.removeEventListener('mousedown', currentToolCallback);

  currentToolCallback = (e) => {
    const event = e || window.event;
    const target = event.CurrentTarget || event.srcElement;
    if (target.tagName === 'CANVAS') {
      const style = getComputedStyle(target);
      const radius = style.borderRadius;
      if (radius === '0px') {
        target.style.borderRadius = '50%';
      } else {
        target.style.borderRadius = '0px';
      }
    }
  };

  canvasArea.addEventListener('click', currentToolCallback);
}


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
