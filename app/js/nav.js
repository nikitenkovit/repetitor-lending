"use strict";

(function () {
  var toggleButton = document.querySelector('.navigation__toggle-button');
  var openingHours = document.querySelector('.opening-hours');
  var checkInACourseBtn = document.querySelector('.navigation__button-check-in-a-course');
  var navigationList = document.querySelector('.navigation__list');

  var changeClasses = function () {
    toggleButton.classList.toggle('navigation__toggle-button--active');
    openingHours.classList.toggle('opening-hours--active');
    checkInACourseBtn.classList.toggle('navigation__button-check-in-a-course--active');
    navigationList.classList.toggle('navigation__list--active');
  };

  toggleButton.addEventListener('click', function () {
    changeClasses();
  });

  /*smooth scroll to the anchor*/

  var linkNav = navigationList.querySelectorAll('[href^="#"]');
   var V = 0.1;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
      e.preventDefault(); //отменяем стандартное поведение
      var w = window.pageYOffset,  // производим прокрутка прокрутка
        hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
      var t = document.querySelector(hash).getBoundingClientRect().top;  // отступ от окна браузера до id
      var start = null;
      requestAnimationFrame(step);

      function step(time) {
        if (start === null) start = time;
        var progress = time - start,
          r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step)
        } else {
          location.hash = hash  // URL с хэшем
        }
      }
    }, false);
  }
})();