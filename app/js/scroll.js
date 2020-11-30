"use strict";

(function () {
  var scrollContainer = document.querySelector('.scroll-container');

  var createScrollBar = function () {
    var newScrollTrek = document.createElement('div');
    newScrollTrek.classList.add('scroll-container__scroll-trek');

    scrollContainer.appendChild(newScrollTrek);

    var newScrollPin = document.createElement('div');
    newScrollPin.classList.add('scroll-container__scroll-pin');

    newScrollTrek.appendChild(newScrollPin);
  };

  createScrollBar();

  var scrollTrek = document.querySelector('.scroll-container__scroll-trek');
  var scrollPin = document.querySelector('.scroll-container__scroll-pin');
   scrollPin.style.top = '0';

  var scrollHeightValue = scrollContainer.scrollHeight - 31;
  var containerHeightValue = scrollContainer.offsetHeight;

  var scrollPinHeightValue = (containerHeightValue / scrollHeightValue) * 100;

  scrollPin.style.height = scrollPinHeightValue + '%';
// console.log(scrollHeightValue)












  scrollContainer.addEventListener('scroll', function (event) {
    var scrollValue = event.target.scrollTop;
    scrollTrek.style.top = scrollValue + 'px';
    // scrollPin.style.top = scrollValue + 'px';

    var scrollPinTopPosition = (scrollValue / scrollHeightValue) * 100;

    scrollPin.style.top = scrollPinTopPosition + '%';
  });



































})();