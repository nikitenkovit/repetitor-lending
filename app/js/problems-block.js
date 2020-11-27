"use strict";

(function () {
  var sliderList = document.querySelector('.problems__list');
  var allSliderItems = sliderList.children;
  var firstSliderItem = allSliderItems[0];
  var indicatorsList = document.querySelector(".problems__slider-indicators");
  var indicatorsTemplate = document.querySelector('.slider-indicators__template');
  var indicatorsTemplateContent = indicatorsTemplate.content;
  var allIndicatorsItem = indicatorsList.children;
  var swipeValue = 600;
  var toLeft = -1;
  var toRight = 1;

  /*add indicators on page start*/
  var addIndicator = function () {
    var newElement = indicatorsTemplateContent.cloneNode(true);
    indicatorsList.appendChild(newElement);
  }

  for (var i = 0; i < allSliderItems.length; i++) {
    addIndicator();
  }

  indicatorsTemplate.remove();
  /*add indicators on page end*/

  /*change active indicator start*/
  allIndicatorsItem[0].classList.add('slider-indicators__item--active');

  var swipeCounter = 0;

  var changeActiveIndicator = function () {
    var currentActiveIndicator = indicatorsList.querySelector('.slider-indicators__item--active');
    currentActiveIndicator.classList.remove('slider-indicators__item--active');
    swipeCounter++;
    if (swipeCounter > allSliderItems.length -1) {
      swipeCounter = 0;
    }

    allIndicatorsItem[swipeCounter].classList.add('slider-indicators__item--active');
  }
  /*change active indicator end*/

  /*add z-index to slider items start*/
  var addIndex = function () {
    for (var i = 0; i < allSliderItems.length; i++) {
      var startIndex = 2;
      var currentIndex = i;

      allSliderItems[i].style.zIndex = startIndex - currentIndex + "";
    }
  }

  addIndex()
  /*add z-index to slider items end*/

  /*swipe slider item start*/
  var moveElementToEnd = function () {
    var swap = firstSliderItem.cloneNode(true);
    sliderItemsTouchstartHandler(swap)
    sliderList.appendChild(swap);
    firstSliderItem.remove();

    addIndex();

    firstSliderItem = allSliderItems[0];
  };

  var swipeElement = function (element, side) {
    element.style.left = (swipeValue * side) + 'px';

    changeActiveIndicator();

    setTimeout(function () {
      element.style.left = 0 + 'px';

      moveElementToEnd();

      isMoved = false;
    }, 500)
  }
  /*swipe slider item end*/

  /*drag and drop start*/
  var isMoved = false;

  var touchStart = function (startEvent) {
    var startX = Math.round(startEvent.changedTouches[0].clientX);

    var touchMove = function (moveEvent) {
      var shiftX = startX - Math.round(moveEvent.changedTouches[0].clientX);

      if (shiftX > 0) {
        swipeElement(startEvent.target, toLeft);
        firstSliderItem.removeEventListener('touchmove', touchMove);
        isMoved = true;

      } else  if (shiftX < 0) {
        swipeElement(startEvent.target, toRight);
        firstSliderItem.removeEventListener('touchmove', touchMove);
        isMoved = true;
      }
    };

    var touchEnd = function () {
      firstSliderItem.removeEventListener('touchmove', touchMove);
      firstSliderItem.removeEventListener('touchend', touchEnd);
    };
    firstSliderItem.addEventListener('touchmove', touchMove);
    firstSliderItem.addEventListener('touchend', touchEnd);
  }
  /*drag and drop end*/

  /*add handlers start*/
  var sliderItemsTouchstartHandler = function(element) {

    element.addEventListener('touchstart', function (event) {
      if (!isMoved) {
        touchStart(event);
      }
    });
  };

  var addTouchstartHandler = function () {
    for (var i = 0; i < allSliderItems.length; i ++) {
      sliderItemsTouchstartHandler(allSliderItems[i]);
    }
  }

  addTouchstartHandler();
  /*add handlers end*/

})();