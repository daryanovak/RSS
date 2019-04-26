
var canvas = document.getElementsByClassName('palette__canvas-area__canvas');
var transformButton = document.getElementsByClassName('pallete__tools__transform-button');

// transformButton[0].addEventListener("click", function () {
//   Array.prototype.forEach.call(canvas, function (el) {
//     let count = 1;
//     el.addEventListener("click", function () {
//       if (count % 2 == 0) {
//         el.style.borderRadius = "50%";
//         count++;
//       }
//       else {
//         el.style.borderRadius = "0px";
//         count++;
//       }
//     });
//   });
// });


var canvas_area = document.getElementsByClassName('pallete__canvas-area');
var transformButton = document.getElementsByClassName('pallete__tools__transform-button');

// canvas_area[0].onclick = function (element) {

//   var target = event.target;
//   let count = 1;
//   while (target != this) {
//     if (target.tagName == 'CANVAS') {
//       if (count % 2 == 0) {
//         target.style.borderRadius = "50%";
//         count++;
//       }
//       else {
//         target.style.borderRadius = "0px";
//         count++;
//       }
//     }
//   }
// }


var canArea = document.getElementsByClassName('pallete__color-picker');
canArea[0].onclick = function (e) {
  var event = e || window.event,
    target = event.CurrentTarget || event.srcElement;
  if (target.tagName == 'CANVAS') {
    target.style.borderRadius = "50%";
  }
};
