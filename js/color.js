// choose color

var colorPicker = document.getElementsByClassName('pallete__color-picker');
var currentColor = document.getElementsByClassName('pallete__colors-option__current-color');
var prevColor = document.getElementsByClassName('pallete__colors-option__prev-color');

colorPicker[0].onclick = function (e) {
    var event = e || window.event,
        target = event.CurrentTarget || event.srcElement;
    if (target.tagName == 'DIV') {
        var cur = getComputedStyle(currenttColor[0]);
        let bgColor = cur.backgroundColor;
        const getColorFromPicker = getComputedStyle(target)
        const colorFromPicker = getColorFromPicker.backgroundColor;
        currentColor[0].style.backgroundColor = colorFromPicker;
        prevColor[0].style.backgroundColor = bgColor;
    }
};

//color bucket 

