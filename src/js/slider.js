import {debounce, valueWindowWidth} from "./utils";

const Direction = {
  LEFT: -1,
  RIGHT: 1
}
const animationTime = 300;
const framesCount = 20;

export default class Slider {
  constructor(currentSlider) {
    this._slider = currentSlider;
    this._sliderTrack = this._slider.querySelector('.slider-track');
    this._sliderAllItem = this._sliderTrack.children;
    this._buttonLeft = this._slider.querySelector('.slider__button--left');
    this._buttonRight = this._slider.querySelector('.slider__button--right');

    this._allYearsLink = document.querySelectorAll('.reviews__years-link');
    this._allReviewsList = document.querySelectorAll('.reviews__list');

    this._needMoove = true;

    this._handleTransitionStart();
    this._handleTransitionEnd();
    this._handleButtonLeftClick = this._handleButtonLeftClick.bind(this);
    this._handleButtonRightClick = this._handleButtonRightClick.bind(this);
    this._handleSliderTrackTouchStart = this._handleSliderTrackTouchStart.bind(this);
    this._handleWindowResize = this._handleWindowResize.bind(this);
    this._touchStart = this._touchStart.bind(this);

    this._yearsLinkClickHandler = this._yearsLinkClickHandler.bind(this);
  }

  init() {
    this._startWindowWidth = valueWindowWidth();

    this._sliderTrack.style.position = 'relative';
    this._sliderTrack.style.left = 0;
    this._sliderTrack.style.transition = '.6s left ease';

    this._scrollWidth = this._sliderAllItem[0].offsetWidth;
    this._itemMarginRight = parseInt(window.getComputedStyle(this._sliderAllItem[0], null)
        .getPropertyValue('margin-right'), 10);

    setTimeout(() => {
      this._checkIsNeedButtonDisabled()
    }, 600)

    this._setJustifyContent();
  }

  _checkIsNeedButtonDisabled() {
    this._buttonRight.disabled = parseInt(this._sliderTrack.style.left) >= 0;
    this._buttonLeft.disabled = this._slider.scrollWidth === this._slider.offsetWidth;
  }

  _setJustifyContent() {
    if (this._slider.classList.contains('teachers__slider')
        && document.documentElement.clientWidth > 979 && this._sliderAllItem.length > 5) {
      this._sliderTrack.style.justifyContent = 'flex-start';
    } else if (this._slider.classList.contains('teachers__slider')
        && document.documentElement.clientWidth > 979 && sliderAllItem.length < 5) {
      this._sliderTrack.style.justifyContent = 'center';
    } else if (this._slider.classList.contains('teachers__slider')
        && this._sliderAllItem.length === 1 && document.documentElement.clientWidth <= 979) {
      this._sliderTrack.style.justifyContent = 'center';
    } else if (this._slider.classList.contains('teachers__slider')
        && this._sliderAllItem.length > 1 && document.documentElement.clientWidth <= 979) {
      this._sliderTrack.style.justifyContent = 'flex-start';
    }
  }

  _moveSliderTrack(direction) {
    if (this._needMoove) {
      this._sliderTrack.style.left = (parseInt(this._sliderTrack.style.left, 10)
          + ((this._scrollWidth + this._itemMarginRight)) * direction) + 'px';

      setTimeout(() => {
        this._checkIsNeedButtonDisabled()
      }, 600);

      if (this._slider.classList.contains('reviews__container')) {
        this._scrollFunction();
      }
    }
  }

  _touchStart(startEvent) {
    const startX = startEvent.changedTouches[0].clientX;

    const touchMove = (moveEvent) => {
      const shiftX = startX - moveEvent.changedTouches[0].clientX;

      if (shiftX > 0 && !this._buttonLeft.disabled) {
        this._moveSliderTrack(Direction.LEFT);

        this._sliderTrack.removeEventListener('touchmove', touchMove);
      }
      if (shiftX < 0 && !this._buttonRight.disabled) {
        this._moveSliderTrack(Direction.RIGHT);

        this._sliderTrack.removeEventListener('touchmove', touchMove);
      }
    };

    const touchEnd = () => {
      this._sliderTrack.removeEventListener('touchmove', touchMove);
      this._sliderTrack.removeEventListener('touchend', touchEnd);
    };
    this._sliderTrack.addEventListener('touchmove', touchMove);
    this._sliderTrack.addEventListener('touchend', touchEnd);
  }

  _scrollFunction() {
    var coordY = this._sliderTrack.getBoundingClientRect().top + window.pageYOffset;
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

  _handleButtonLeftClick() {
    this._buttonLeft.addEventListener('click', () => {
      this._moveSliderTrack(Direction.LEFT);
    });
  }

  _handleButtonRightClick() {
    this._buttonRight.addEventListener('click', () => {
      this._moveSliderTrack(Direction.RIGHT);
    });
  }

  _handleSliderTrackTouchStart() {
    this._sliderTrack.addEventListener('touchstart', (event) => {
      this._touchStart(event);
    });
  }

  _handleTransitionStart() {
    this._sliderTrack.addEventListener(`transitionstart`, () => {
      this._needMoove = false;
    })
  }

  _handleTransitionEnd() {
    this._sliderTrack.addEventListener(`transitionend`, () => {
      this._needMoove = true;
    })
  }

  _reInitiateSlider() {
    const currentWindowWidth = valueWindowWidth();

    if (currentWindowWidth !== this._startWindowWidth) {
      this.init();
    }

    setTimeout(function () {
      this._startWindowWidth = valueWindowWidth();
    }, 300)
  }

  _handleWindowResize() {
    window.addEventListener('resize', debounce(() => {
      this._reInitiateSlider()
    }))
  }

  setHandlers() {
    this._handleButtonLeftClick();
    this._handleButtonRightClick();
    this._handleSliderTrackTouchStart();
    this._handleWindowResize();
  }

  behaviorOnlyReviewsBlock() {
    if (this._slider.classList.contains('reviews__container')) {

      for (let i = 0; i < this._allYearsLink.length; i++) {
        this._yearsLinkClickHandler(this._allYearsLink[i])
      }
    }
  }

  _getHref(element) {
    const currentHref = element.href;

    return currentHref.split('#').pop();
  }

  _yearsLinkClickHandler(element) {
    element.addEventListener('click', () => {
      const hrefAttributeValue = this._getHref(element);

      for (let i = 0; i < this._allReviewsList.length; i++) {
        if (this._allReviewsList[i].id === hrefAttributeValue) {
          this._sliderTrack = this._allReviewsList[i];
          this._sliderAllItem = this._sliderTrack.children;
          this._buttonLeft = this._slider.querySelector('.slider__button--left');
          this._buttonRight = this._slider.querySelector('.slider__button--right');
        }
      }

      setTimeout(() => {
        this.init();
      }, 100)
    });
  };
}
