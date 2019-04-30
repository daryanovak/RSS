export default function paintBucket() {
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