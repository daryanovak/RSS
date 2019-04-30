export default function setCanvasStyle(style, i, rowNumber) {
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
  