export default function transform() {
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
  