export default function move() {
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
  