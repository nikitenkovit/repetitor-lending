;(function () {
  const upBtn = document.querySelector('.up-button');

  const scrollFunction = () => {
    if (window.pageYOffset > 200) {
      upBtn.classList.remove('up-button--hidden')
    } else {
      upBtn.classList.add('up-button--hidden')
    }
  };

  window.addEventListener(`scroll`, scrollFunction);

  const backToTop = () => {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 6);
    }
  };

  upBtn.addEventListener('click', backToTop);
})();
