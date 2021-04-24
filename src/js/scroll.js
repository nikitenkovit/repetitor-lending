import {debounce, valueWindowWidth} from "./utils";

export const customScrollBars = () => {
  let startWindowWidth = valueWindowWidth();

  const mainScrollFunction = (scrollElement) => {

    /*create scroll bar start*/
    const createScrollBar = () => {
      const newScrollTrek = document.createElement('div');
      newScrollTrek.classList.add('scroll-container__scroll-trek');

      scrollElement.appendChild(newScrollTrek);

      const scrollTrek = scrollElement.querySelector('.scroll-container__scroll-trek');
      const newScrollPin = document.createElement('div');
      newScrollPin.classList.add('scroll-container__scroll-pin');

      scrollTrek.appendChild(newScrollPin);
    };

    createScrollBar();
    /*create scroll bar end*/

    /*initiate scroll bar start*/
    const scrollTrek = scrollElement.querySelector('.scroll-container__scroll-trek');
    const scrollPin = scrollElement.querySelector('.scroll-container__scroll-pin');

    scrollPin.style.top = '0';

    const scrollHeightValue = scrollElement.scrollHeight;
    const scrollElementHeightValue = scrollElement.offsetHeight;
    const scrollTrekHeightValue = scrollTrek.offsetHeight;

    const scrollPinPositionLimits = {
      min: 0,
      max: scrollTrekHeightValue
    };

    const scrollTrekPositionLimits = {
      min: 0,
      max: scrollHeightValue
    };

    const scrollPinHeightValue = (scrollElementHeightValue / scrollHeightValue) * 100;

    scrollPin.style.height = scrollPinHeightValue + '%';


    if (scrollHeightValue <= scrollTrekHeightValue) {
      scrollTrek.style.display = 'none';
    } else {
      scrollTrek.style.display = 'block';
    }
    /*initiate scroll bar end*/

    /*add scroll handler start*/
    scrollElement.addEventListener('scroll', (event) => {
      const scrollValue = event.target.scrollTop;
      scrollTrek.style.top = scrollValue + 'px';

      if (parseInt(scrollTrek.style.top) < scrollTrekPositionLimits.min) {
        scrollTrek.style.top = scrollTrekPositionLimits.min + 'px';
      }
      if (parseInt(scrollTrek.style.top) + scrollPin.offsetHeight > scrollTrekPositionLimits.max) {
        scrollTrek.style.top = scrollTrekPositionLimits.max - scrollTrek.offsetHeight + 'px';
      }

      const scrollPinTopPosition = (scrollValue / scrollHeightValue) * 100;
      scrollPin.style.top = scrollPinTopPosition + '%';

      if (parseInt(scrollPin.style.top) < scrollPinPositionLimits.min) {
        scrollPin.style.top = scrollPinPositionLimits.min + 'px';
      }
      if (parseInt(scrollPin.style.top) + scrollPin.offsetHeight > scrollPinPositionLimits.max) {
        scrollPin.style.top = scrollPinPositionLimits.max - scrollPin.offsetHeight + 'px';
      }
    });
    /*add scroll handler end*/

    /*add drag`n drop handler start*/
    const onMouseDown = (evt) => {
      evt.preventDefault();

      let startY = evt.clientY;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        const shiftY = startY - moveEvt.clientY;

        startY = moveEvt.clientY;

        scrollPin.style.top = (scrollPin.offsetTop - shiftY) + 'px';

        if (parseInt(scrollPin.style.top) < scrollPinPositionLimits.min) {
          scrollPin.style.top = scrollPinPositionLimits.min + 'px';
        }
        if (parseInt(scrollPin.style.top) + scrollPin.offsetHeight > scrollPinPositionLimits.max) {
          scrollPin.style.top = scrollPinPositionLimits.max - scrollPin.offsetHeight + 'px';
        }

        scrollElement.scrollTop = scrollElement.scrollTop - (shiftY + ((shiftY / 100) * 150));
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    scrollPin.addEventListener('mousedown', onMouseDown);

    /*add drag`n drop handler end*/
  };

  /*find all scroll elements and add all scroll bars on page start*/
  const allScrollElements = document.querySelectorAll('.scroll-container');

  const addAllScrollBars = () => {
    for (let i = 0; i < allScrollElements.length; i++) {
      const currentScrollTrek = allScrollElements[i].querySelector('.scroll-container__scroll-trek');

      if (currentScrollTrek) {
        allScrollElements[i].removeChild(currentScrollTrek);
      }
    }

    for (let i = 0; i < allScrollElements.length; i++) {
      mainScrollFunction(allScrollElements[i]);
    }
  };

  addAllScrollBars();
  /*find all scroll elements and add all scroll bars on page end*/

  /*re-initiate if the window has changed start*/
  const reAddAllScrollBars = () => {
    const currentWindowWidth = valueWindowWidth();

    if (currentWindowWidth !== startWindowWidth) {
      addAllScrollBars();
    }
    startWindowWidth = valueWindowWidth();
  };

  window.addEventListener('resize', debounce(() => {
    reAddAllScrollBars();
  }));
  /*re-initiate if the window has changed end*/

  /*re-initiate if tab link click start*/
  const allTabsLinks = document.querySelectorAll('.reviews__years-link');

  const tabLinkClickHandler = (element) => {
    element.addEventListener('click', () => {
      addAllScrollBars();
    });
  };

  for (let i = 0; i < allTabsLinks.length; i++) {
    tabLinkClickHandler(allTabsLinks[i]);
  }
  /*re-initiate if tab link click end*/
};
