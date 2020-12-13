(function () {
  var slider = document.querySelector('.slider');
  var sliderTrack = document.querySelector('.slider-track');
  var sliderAllItem = sliderTrack.children;
  var buttonLeft = document.querySelector('.slider__button--left');
  var buttonRight = document.querySelector('.slider__button--right');
  var scrollWidth = sliderAllItem[0].offsetWidth;
  var itemMarginRight = parseInt(window.getComputedStyle(sliderAllItem[0], null).getPropertyValue('margin-right'), 10);
  sliderTrack.style.position = 'relative';
  sliderTrack.style.left = 0;
  sliderTrack.style.transition = '.7s left ease-out';
  var directionToLeft = -1;
  var directionToRight = 1;
  var isMoved = false;

  var sliderInitiate = function () {
    sliderTrack.style.position = 'relative';
    sliderTrack.style.left = 0;
    scrollWidth = sliderAllItem[0].offsetWidth;
    itemMarginRight = parseInt(window.getComputedStyle(sliderAllItem[0], null).getPropertyValue('margin-right'), 10);
    buttonRight.disabled = parseInt(sliderTrack.style.left) >= 0;
    buttonLeft.disabled = slider.scrollWidth === slider.offsetWidth;
  }

  buttonRight.disabled = parseInt(sliderTrack.style.left) >= 0;
  buttonLeft.disabled = slider.scrollWidth === slider.offsetWidth;

  /*moveSliderTrack function start*/
  var moveSliderTrack = (direction) => {
      sliderTrack.style.left = (parseInt(sliderTrack.style.left, 10) + ((scrollWidth + itemMarginRight)) * direction) + 'px';

    setTimeout(function () {
      isMoved = false;

      buttonRight.disabled = parseInt(sliderTrack.style.left) >= 0;
      buttonLeft.disabled = slider.scrollWidth === slider.offsetWidth;
    }, 700);
  };
  /*moveSliderTrack function end*/

  /*drag and drop start*/
  var touchStart = function (startEvent) {
    var startX = startEvent.changedTouches[0].clientX;

    var touchMove = function (moveEvent) {
      var shiftX = startX - moveEvent.changedTouches[0].clientX;

      if (shiftX > 0 && !buttonLeft.disabled) {
        moveSliderTrack(directionToLeft);
        sliderTrack.removeEventListener('touchmove', touchMove);
        isMoved = true;
      }
      if (shiftX < 0 && !buttonRight.disabled) {
        moveSliderTrack(directionToRight)
        sliderTrack.removeEventListener('touchmove', touchMove);
        isMoved = true;
      }
    };

    var touchEnd = function () {
      sliderTrack.removeEventListener('touchmove', touchMove);
      sliderTrack.removeEventListener('touchend', touchEnd);
    };
    sliderTrack.addEventListener('touchmove', touchMove);
    sliderTrack.addEventListener('touchend', touchEnd);
  }
  /*drag and drop end*/

  /*add handlers*/
  buttonLeft.addEventListener('click', function () {
    moveSliderTrack(directionToLeft)
  });

  buttonRight.addEventListener('click', function () {
    moveSliderTrack(directionToRight)
  });

  sliderTrack.addEventListener('touchstart', function (event) {
    if (!isMoved) {
      touchStart(event);
    }
  });

  window.addEventListener('resize', sliderInitiate);

})();
