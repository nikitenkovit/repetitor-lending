(function () {
  var allSliders = document.querySelectorAll('.slider');
  var startWindowWidth = window.utils.valueWindowWidth();

  var mainSliderFunction = function (currentSlider) {
    var slider = currentSlider;
    var sliderTrack = slider.querySelector('.slider-track');
    var sliderAllItem = sliderTrack.children;
    var buttonLeft = slider.querySelector('.slider__button--left');
    var buttonRight = slider.querySelector('.slider__button--right');
    var scrollWidth = sliderAllItem[0].offsetWidth;
    var itemMarginRight = parseInt(window.getComputedStyle(sliderAllItem[0], null).getPropertyValue('margin-right'), 10);
    sliderTrack.style.position = 'relative';
    sliderTrack.style.left = 0;
    sliderTrack.style.transition = '.7s left ease-out';
    var directionToLeft = -1;
    var directionToRight = 1;
    var isMoved = false;

    if (currentSlider.classList.contains('teachers__slider') && document.documentElement.clientWidth > 979 && sliderAllItem.length > 5) {
      sliderTrack.style.justifyContent = 'flex-start';
    } else if (currentSlider.classList.contains('teachers__slider') && document.documentElement.clientWidth > 979 && sliderAllItem.length < 5) {
      sliderTrack.style.justifyContent = 'center';
    } else if (currentSlider.classList.contains('teachers__slider') && sliderAllItem.length === 1 && document.documentElement.clientWidth <= 979) {
      sliderTrack.style.justifyContent = 'center';
    } else if (currentSlider.classList.contains('teachers__slider') && sliderAllItem.length > 1 && document.documentElement.clientWidth <= 979) {
      sliderTrack.style.justifyContent = 'flex-start';
    }

    var sliderInitiate = function () {
      sliderTrack.style.position = 'relative';
      sliderTrack.style.left = 0;
      sliderTrack.style.transition = '.7s left ease-out';
      scrollWidth = sliderAllItem[0].offsetWidth;
      itemMarginRight = parseInt(window.getComputedStyle(sliderAllItem[0], null).getPropertyValue('margin-right'), 10);
      setTimeout(function () {
        buttonRight.disabled = parseInt(sliderTrack.style.left) >= 0;
        buttonLeft.disabled = slider.scrollWidth === slider.offsetWidth;
      }, 700)
      if (currentSlider.classList.contains('teachers__slider') && document.documentElement.clientWidth > 979 && sliderAllItem.length > 5) {
        sliderTrack.style.justifyContent = 'flex-start';
      } else if (currentSlider.classList.contains('teachers__slider') && document.documentElement.clientWidth > 979 && sliderAllItem.length < 5) {
        sliderTrack.style.justifyContent = 'center';
      } else if (currentSlider.classList.contains('teachers__slider') && sliderAllItem.length === 1 && document.documentElement.clientWidth <= 979) {
        sliderTrack.style.justifyContent = 'center';
      } else if (currentSlider.classList.contains('teachers__slider') && sliderAllItem.length > 1 && document.documentElement.clientWidth <= 979) {
        sliderTrack.style.justifyContent = 'flex-start';
      }
    };

    setTimeout(function () {
      buttonRight.disabled = parseInt(sliderTrack.style.left) >= 0;
      buttonLeft.disabled = slider.scrollWidth === slider.offsetWidth;
    }, 700)

    /*moveSliderTrack function start*/
    var moveSliderTrack = function (direction) {
      sliderTrack.style.left = (parseInt(sliderTrack.style.left, 10) + ((scrollWidth + itemMarginRight)) * direction) + 'px';

      setTimeout(function () {
        isMoved = false;

        buttonRight.disabled = parseInt(sliderTrack.style.left) >= 0;
        buttonLeft.disabled = slider.scrollWidth === slider.offsetWidth;
      }, 700);

      if (currentSlider.classList.contains('reviews__container')) {
        scrollFunction();
      }
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

    /*add handlers start*/
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

    /*re-initiate slider if changed window width start*/
    var reInitiateSliders = window.utils.debounce(function () {
      var currentWindowWidth = window.utils.valueWindowWidth();

      if (currentWindowWidth !== startWindowWidth) {
        sliderInitiate();
      }
      setTimeout(function () {
        startWindowWidth = window.utils.valueWindowWidth();
      }, 1000)
    }, 1000)

    window.addEventListener('resize', reInitiateSliders)
    /*re-initiate slider if changed window width end*/
    /*add handlers end*/

    /*behavior only reviews block start*/
    if (currentSlider.classList.contains('reviews__container')) {
      var allYearsLink = document.querySelectorAll('.reviews__years-link');
      var allReviewsList = document.querySelectorAll('.reviews__list');

      var getHref = function (element) {
        var currentHref = element.href;
        return currentHref.split('#').pop();
      }

      var yearsLinkClickHandler = function (element) {
        element.addEventListener('click', function () {

          var hrefAttributeValue = getHref(element);

          for (var t = 0; t < allReviewsList.length; t++) {
            if (allReviewsList[t].id === hrefAttributeValue) {
              sliderTrack = allReviewsList[t];
              sliderAllItem = sliderTrack.children;
              buttonLeft = slider.querySelector('.slider__button--left');
              buttonRight = slider.querySelector('.slider__button--right');
            }
          }
          setTimeout(function () {
            sliderInitiate();
          }, 100)
        });
      };

      for (var j = 0; j < allYearsLink.length; j++) {
        yearsLinkClickHandler(allYearsLink[j])
      }
    }

    var animationTime = 300;
    var framesCount = 20;

    var scrollFunction = function () {
      var coordY = sliderTrack.getBoundingClientRect().top + window.pageYOffset;
      var scroller = setInterval(function () {
        var scrollBy = coordY / framesCount;

        if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
          window.scrollBy(0, scrollBy);
        } else {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        }
      }, animationTime / framesCount);
    };
    /*behavior only reviews block start*/
  };

  /*add slider function for all necessary blocks*/
  for (var i = 0; i < allSliders.length; i++) {
    mainSliderFunction(allSliders[i]);
  }

})();