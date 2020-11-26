"use strict";

(function () {
  var sliderList = document.querySelector('.problems__list');
  var sliderItem = sliderList.querySelector('.problems__item');
  var allSliderItems = document.querySelectorAll('.problems__item');
  var indicatorsList = document.querySelector(".problems__slider-indicators");
  var indicatorsTemplateContent = document.querySelector('.slider-indicators__template').content;
  var allIndicatorsItem = document.querySelectorAll('.slider-indicators__item');


  /*add indicators on page start*/
  var addIndicator = function () {
    var newElement = indicatorsTemplateContent.cloneNode(true);
    indicatorsList.appendChild(newElement);
  }

  for (var i = 0; i < allSliderItems.length; i++) {
    addIndicator();
  }
  /*add indicators on page end*/

  /*add z-index to slider items start*/
  console.log(sliderList.length)
  /*add z-index to slider items end*/

















  /*drag and drop start*/
  // var isMoved = false;

  var touchStart = function (startEvent, callback1, callback2) {
    var startX = Math.round(startEvent.changedTouches[0].clientX);

    var touchMove = function (moveEvent) {
      var shiftX = startX - Math.round(moveEvent.changedTouches[0].clientX);
      if (shiftX > 0) {
        callback1();
        sliderItem.removeEventListener('touchmove', touchMove);
        // isMoved = true;

      } else  {
        callback2();
        sliderItem.removeEventListener('touchmove', touchMove);
        // isMoved = true;
      }
    };

    var touchEnd = function () {
      sliderItem.removeEventListener('touchmove', touchMove);
      sliderItem.removeEventListener('touchend', touchEnd);
    };
    sliderItem.addEventListener('touchmove', touchMove);
    sliderItem.addEventListener('touchend', touchEnd);
  }
  /*drag and drop end*/
var left = function () {
  console.log('left');
}

var right = function () {
  console.log('right');
}

  /*add handlers*/
  sliderItem.addEventListener('touchstart', function (event) {
    // if (!isMoved) {
      touchStart(event, left, right);
    // }
  });





































})();