var ball = document.getElementsByClassName('pallete__canvas-area');

ball[0].onmousedown = function(e) { // 1. отследить нажатие

  // подготовить к перемещению
  // 2. разместить на том же месте, но в абсолютных координатах
  ball[0].style.position = 'absolute';
  moveAt(e);
  // переместим в body, чтобы мяч был точно не внутри position:relative
  document.body.appendChild(ball[0]);

  ball[0].style.zIndex = 1000; // показывать мяч над другими элементами

  // передвинуть мяч под координаты курсора
  // и сдвинуть на половину ширины/высоты для центрирования
  function moveAt(e) {
    ball[0].style.left = e.pageX - ball[0].offsetWidth / 2 + 'px';
    ball[0].style.top = e.pageY - ball[0].offsetHeight / 2 + 'px';
  }

  // 3, перемещать по экрану
  document.onmousemove = function(e) {
    moveAt(e);
  }

  // 4. отследить окончание переноса
  ball[0].onmouseup = function() {
    document.onmousemove = null;
    ball[0].onmouseup = null;
  }
}