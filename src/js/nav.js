"use strict";

(function () {
  const toggleButton = document.querySelector('.navigation__toggle-button');
  const openingHours = document.querySelector('.opening-hours');
  const checkInACourseBtn = document.querySelector('.navigation__button-check-in-a-course');
  const navigationList = document.querySelector('.navigation__list');

  const changeClasses = () => {
    toggleButton.classList.toggle('navigation__toggle-button--active');
    openingHours.classList.toggle('opening-hours--active');
    checkInACourseBtn.classList.toggle('navigation__button-check-in-a-course--active');
    navigationList.classList.toggle('navigation__list--active');
  };

  toggleButton.addEventListener('click', changeClasses);
})();