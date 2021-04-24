;(function () {
  const scrollContainer = document.querySelector('.why-are-we__container');
  const sliderList = document.querySelector('.why-are-we__list');
  const allSliderItems = sliderList.children;
  const indicatorsList = document.querySelector(".why-are-we__slider-indicators");

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

  allIndicatorsItem[0].classList.add('slider-indicators__item--active');

  scrollContainer.addEventListener('scroll', (event) => {
    const currentActiveElement = indicatorsList.querySelector('.slider-indicators__item--active');

    currentActiveElement.classList.remove('slider-indicators__item--active');

   const scrolledLeft = event.target.scrollLeft;
   let currentValue = Math.round((scrolledLeft / sliderList.offsetWidth) * allIndicatorsItem.length);

    // if (document.documentElement.clientWidth >= 768) currentValue += 1;
    if (scrolledLeft === 0) {
      currentValue = 0;
    }
    if (scrolledLeft >= sliderList.offsetWidth - document.documentElement.clientWidth) {
      currentValue = allIndicatorsItem.length - 1;
    }

    allIndicatorsItem[currentValue].classList.add('slider-indicators__item--active');
  })
})();