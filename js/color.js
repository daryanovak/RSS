var canArea = document.getElementsByClassName('pallete__canvas-area');
canArea[0].onclick = function (e) {
  var event = e || window.event,
    target = event.CurrentTarget || event.srcElement;
  if (target.tagName == 'CANVAS') {
    target.style.borderRadius = "50%";
  }
};