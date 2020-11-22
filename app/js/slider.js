(function () {
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

  var sliderInitiate = function () {
    sliderTrack.style.position = 'relative';
    sliderTrack.style.left = 0;
    scrollWidth = sliderAllItem[0].offsetWidth;
    itemMarginRight = parseInt(window.getComputedStyle(sliderAllItem[0], null).getPropertyValue('margin-right'), 10);
  }

  /*moveSliderTrack function start*/
  var moveSliderTrack = (direction) => {
    sliderTrack.style.left = (parseInt(sliderTrack.style.left, 10) + (parseInt(sliderTrack.style.left) + (scrollWidth + itemMarginRight)) * direction) + 'px';
    console.log(sliderTrack.style.left)
    buttonLeft.removeEventListener('click', moveSliderTrack); //cancel handler

    setTimeout(function () {
      buttonLeft.addEventListener('click', function () {
        moveSliderTrack(direction)
      });
      isMoved = false
    }, 700)
  };
  /*moveSliderTrack function end*/

  /*drag and drop start*/

  var isMoved = false;

  var touchStart = function (startEvent, callback1, callback2) {
    var startX = startEvent.changedTouches[0].clientX;

    var touchMove = function (moveEvent) {
      var shiftX = startX - moveEvent.changedTouches[0].clientX;

      if (shiftX > 0) {
        callback1();
        sliderTrack.removeEventListener('touchmove', touchMove);
        isMoved = true;
      } else {
        callback2();
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
      touchStart(event, moveSliderTrack(directionToLeft), moveSliderTrack(directionToRight));
    }
  });
  window.addEventListener('resize', sliderInitiate);

  // /*set interval*/
  //
  // setInterval(moveLeft, 7000)

}());
