// choose color

var colorPicker = document.getElementsByClassName('pallete__color-picker');
var currentColor = document.getElementsByClassName('pallete__colors-option__current-color');
var prevColor = document.getElementsByClassName('pallete__colors-option__prev-color');

colorPicker[0].onclick = function (e) {
    var event = e || window.event,
        target = event.CurrentTarget || event.srcElement;
    let prevColor = "#000"
    if (target.tagName == 'DIV') {
        const style = getComputedStyle(target)
        const backgroundColor = style.backgroundColor
        alert(backgroundColor);
        currentColor[0].style.backgroundColor = backgroundColor;
    }
};

//color bucket 
var canvasArea = document.getElementsByClassName('pallete__canvas-area');
var currenttColor = document.getElementsByClassName('pallete__colors-option__current-color');

canvasArea[0].onclick = function (e) {
    var event = e || window.event,
        target = event.CurrentTarget || event.srcElement;
    if (target.tagName == 'CANVAS') {
        var style = getComputedStyle(currenttColor[0]);
        let bgColor = style.backgroundColor;
        target.style.backgroundColor = bgColor;
        alert("jw");
    }
};
