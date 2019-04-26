
var canvas1 = document.getElementsByClassName('palette__canvas-area__canvas1');
var transformButton = document.getElementsByClassName('pallete__tools__transform-button');

transformButton[0].addEventListener("click", function () {
  
  var count = 1;
  canvas1[0].addEventListener("click", function () {
    if (count % 2 == 0) {
      canvas1[0].style.borderRadius = "50%";
      count++;
    }
    else {
      canvas1[0].style.borderRadius = "0px";
      count++;
    }
  });
});



// var canvas1 = document.getElementsByClassName('palette__canvas-area__canvas1');
// var transformButton = document.getElementsByClassName('pallete__tools__transform-button');

// transformButton[0].addEventListener("click", function () {
  
//   var count = 1;
//   canvas1[0].addEventListener("click", function () {
//     if (count % 2 == 0) {
//       canvas1[0].style.borderRadius = "50%";
//       count++;
//     }
//     else {
//       canvas1[0].style.borderRadius = "0px";
//       count++;
//     }
//   });
// });
