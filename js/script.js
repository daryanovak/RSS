var canvasArea = document.getElementsByClassName('pallete__canvas-area');

canvasArea[0].onclick = function (e) {
    var event = e || window.event,
    target = event.CurrentTarget || event.srcElement;
    if (target.tagName == 'CANVAS') { 
      const style = getComputedStyle(target);
      const radius = style.borderRadius;
      if (radius === "0px"){
        target.style.borderRadius = "50%";
      } else {
        target.style.borderRadius = "0px";
      }
    }
  };
     