var menu = document.getElementsByClassName('pallete__option');
let currentToolCallback;


menu[0].addEventListener('click', function (e) {
    if (e.target.classList.contains("pallete__tools__paint-bucket")) {
        var canvasArea = document.getElementsByClassName('pallete__canvas-area')[0];
        var currentColor = document.getElementsByClassName('pallete__colors-option__current-color');

        canvasArea.removeEventListener('click', currentToolCallback);

        currentToolCallback = function (e) {
            var event = e || window.event,
                target = event.CurrentTarget || event.srcElement;
            if (target.tagName == 'CANVAS') {
                var style = getComputedStyle(currentColor[0]);
                let bgColor = style.backgroundColor;
                target.style.backgroundColor = bgColor;
            }
        };

        canvasArea.addEventListener("click", currentToolCallback);

    }

    if (e.target.classList.contains("pallete__tools__choose-color")) {
        var colorPicker = document.getElementsByClassName('pallete__color-picker')[0];
        // var canvasArea = document.getElementsByClassName('pallete__canvas-area')[0];

        // canvasArea.removeEventListener('click', currentToolCallback);
        // colorPicker.removeEventListener('click', currentToolCallback);
        var currentColor = document.getElementsByClassName('pallete__colors-option__current-color')[0];
        var prevColor = document.getElementsByClassName('pallete__colors-option__prev-color')[0];
        currentToolCallback = function (e) {
            var event = e || window.event,
                target = event.CurrentTarget || event.srcElement;
            if (target.tagName == 'DIV') {
                let cur = getComputedStyle(currentColor);
                let bgColor = cur.backgroundColor;
                const getColorFromPicker = getComputedStyle(target)
                const colorFromPicker = getColorFromPicker.backgroundColor;
                currentColor.style.backgroundColor = colorFromPicker;
                prevColor.style.backgroundColor = bgColor;
            }
        };

        colorPicker.addEventListener("click", currentToolCallback);
    }

    if (e.target.classList.contains("pallete__tools__move")) {
        var ball = document.getElementsByClassName('pallete__canvas-area')[0];

        ball.removeEventListener('click', currentToolCallback);
        ball.removeEventListener('mousedown', currentToolCallback);

        currentToolCallback = function (e) {

            // подготовить к перемещению
            // 2. разместить на том же месте, но в абсолютных координатах
            var event = e || window.event,
                target = event.CurrentTarget || event.srcElement;
            if (target.tagName == 'CANVAS') {
                target.style.position = 'absolute';
                moveAt(e);
                // переместим в body, чтобы мяч был точно не внутри position:relative
                document.body.appendChild(ball);

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

        // ball[0].onmousedown = function (e) { // 1. отследить нажатие
        ball.addEventListener("mousedown", currentToolCallback);
    }

    if (e.target.classList.contains("pallete__tools__transform-button")) {
        var canvasArea = document.getElementsByClassName('pallete__canvas-area')[0];
        canvasArea.removeEventListener('click', currentToolCallback);
        canvasArea.removeEventListener('mousedown', currentToolCallback);

        currentToolCallback = function (e) {
            var event = e || window.event,
                target = event.CurrentTarget || event.srcElement;
            if (target.tagName == 'CANVAS') {
                const style = getComputedStyle(target);
                const radius = style.borderRadius;
                if (radius === "0px") {
                    target.style.borderRadius = "50%";
                } else {
                    target.style.borderRadius = "0px";
                }
            }
        }

        canvasArea.addEventListener("click", currentToolCallback);
    }
}
)