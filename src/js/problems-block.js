;(function () {
  const sliderList = document.querySelector('.problems__list');
  const allSliderItems = sliderList.children;
  let firstSliderItem = allSliderItems[0];
  const indicatorsList = document.querySelector(".problems__slider-indicators");
  let swipeValue = 600;
  const toLeft = -1;
  const toRight = 1;

  if (document.documentElement.clientWidth >= 767) swipeValue = 1200;

  window.addEventListener('resize', function () {
    if (document.documentElement.clientWidth < 500) swipeValue = 600;
    if (document.documentElement.clientWidth >= 500) swipeValue = 1200;
  });

  /*add indicators on page start*/
  const createIndicator = () => {
    const newElement = document.createElement('li');
    newElement.classList.add('slider-indicators__item');

    indicatorsList.appendChild(newElement);
  };

  for (let i = 0; i < allSliderItems.length; i++) {
    createIndicator();
  }

  const allIndicatorsItem = indicatorsList.children;

  /*add indicators on page end*/

  /*change active indicator start*/
  allIndicatorsItem[0].classList.add('slider-indicators__item--active');

  let swipeCounter = 0;

  const changeActiveIndicator = () => {
    const currentActiveIndicator = indicatorsList.querySelector('.slider-indicators__item--active');

    currentActiveIndicator.classList.remove('slider-indicators__item--active');

    swipeCounter++;

    if (swipeCounter > allSliderItems.length - 1) {
      swipeCounter = 0;
    }

    allIndicatorsItem[swipeCounter].classList.add('slider-indicators__item--active');
  }
  /*change active indicator end*/

  /*add z-index to slider items start*/
  const addIndex = () => {
    for (var i = 0; i < allSliderItems.length; i++) {
      var startIndex = 2;

      allSliderItems[i].style.zIndex = startIndex - i + "";
    }
  }

  addIndex();
  /*add z-index to slider items end*/

  /*swipe slider item start*/
  const moveElementToEnd = () => {
    const swap = firstSliderItem.cloneNode(true);

    sliderItemsTouchstartHandler(swap)

    sliderList.appendChild(swap);

    firstSliderItem.remove();

    addIndex();

    firstSliderItem = allSliderItems[0];
  };

  const swipeElement = (element, side) => {
    element.style.left = (swipeValue * side) + 'px';

    changeActiveIndicator();

    setTimeout(() => {
      element.style.left = 0 + 'px';

      moveElementToEnd();

      isMoved = false;
    }, 500)
  }
  /*swipe slider item end*/

  /*drag and drop start*/
  let isMoved = false;

  const touchStart = (startEvent) => {
    const startX = Math.round(startEvent.changedTouches[0].clientX);

    const touchMove = (moveEvent) => {
      const shiftX = startX - Math.round(moveEvent.changedTouches[0].clientX);

      if (shiftX > 0) {
        swipeElement(startEvent.target, toLeft);
        firstSliderItem.removeEventListener('touchmove', touchMove);
        isMoved = true;

      } else if (shiftX < 0) {
        swipeElement(startEvent.target, toRight);
        firstSliderItem.removeEventListener('touchmove', touchMove);
        isMoved = true;
      }
    };

    const touchEnd = () => {
      firstSliderItem.removeEventListener('touchmove', touchMove);
      firstSliderItem.removeEventListener('touchend', touchEnd);
    };
    firstSliderItem.addEventListener('touchmove', touchMove);
    firstSliderItem.addEventListener('touchend', touchEnd);
  }
  /*drag and drop end*/

  /*add handlers start*/
  const sliderItemsTouchstartHandler = (element) => {

    element.addEventListener('touchstart', (event) => {
      if (!isMoved && document.documentElement.clientWidth < 980) {
        touchStart(event);
      }
    });
  };

  for (let item = 0; item < allSliderItems.length; item++) {
    sliderItemsTouchstartHandler(allSliderItems[item]);
  }
  /*add handlers end*/

})();