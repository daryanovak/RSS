export default function chooseColor() {
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
  