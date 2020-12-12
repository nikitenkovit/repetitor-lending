"use strict";

(function () {
  var scrollContainer = document.querySelector('.why-are-we__container');
  var sliderList = document.querySelector('.why-are-we__list');
  var allSliderItems = sliderList.children;
  var indicatorsList = document.querySelector(".why-are-we__slider-indicators");
  var indicatorsTemplate = indicatorsList.querySelector('.slider-indicators__template');
  var indicatorsTemplateContent = indicatorsTemplate.content;
  var allIndicatorsItem = indicatorsList.children;

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

  allIndicatorsItem[0].classList.add('slider-indicators__item--active');

  scrollContainer.addEventListener('scroll', function (event) {
    var currentActiveElement = indicatorsList.querySelector('.slider-indicators__item--active');

    currentActiveElement.classList.remove('slider-indicators__item--active');

   var scrolledLeft = event.target.scrollLeft;
   var currentValue = Math.round((scrolledLeft / sliderList.offsetWidth) * allIndicatorsItem.length);

    // if (document.documentElement.clientWidth >= 768) currentValue += 1;
    if (scrolledLeft === 0) currentValue = 0;
    if (scrolledLeft >= sliderList.offsetWidth - document.documentElement.clientWidth) currentValue = allIndicatorsItem.length - 1;

    allIndicatorsItem[currentValue].classList.add('slider-indicators__item--active');
  })

























})();