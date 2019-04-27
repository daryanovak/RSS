var ball = document.getElementsByClassName('pallete__canvas-area');

ball[0].onmousedown = function (e) { // 1. отследить нажатие

    // подготовить к перемещению
    // 2. разместить на том же месте, но в абсолютных координатах
    var event = e || window.event,
        target = event.CurrentTarget || event.srcElement;
    if (target.tagName == 'CANVAS') {
        target.style.position = 'absolute';
        moveAt(e);
        // переместим в body, чтобы мяч был точно не внутри position:relative
        document.body.appendChild(ball[0]);

        target.style.zIndex = 1000; // показывать мяч над другими элементами

        // передвинуть мяч под координаты курсора
        // и сдвинуть на половину ширины/высоты для центрирования
        function moveAt(e) {
            target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
            target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
        }

        // 3, перемещать по экрану
        document.onmousemove = function (e) {
            moveAt(e);
        }

        // 4. отследить окончание переноса
        target.onmouseup = function () {
            document.onmousemove = null;
            target.onmouseup = null;
        }
    }
}