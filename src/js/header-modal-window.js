;(function () {
  const headerModalOverlay = document.querySelector('.header__modal-window--overlay');
  const headerButton = document.querySelector('.header__button-request-a-call');
  const headerModalWindow = document.querySelector('.modalWindow');
  const closeModalWindow = document.querySelector('.closeModalWindow');
  const htmlTag = document.querySelector('html');
  const headerTag = document.querySelector('header');
  const navTag = document.querySelector('nav');
  const mainTag = document.querySelector('main');
  const ESCAPE_CODE = 27;

  const missClick = (evt) => {
    const target = evt.target;
    const itsHeaderModalWindow = target === headerModalWindow || headerModalWindow.contains(target);
    const itsHeaderButton = target === headerButton || headerButton.contains(target);

    if (!itsHeaderModalWindow && !itsHeaderButton) {
      headerModalHandler();
    }
  };

  const pressEsc = (evt) => {
    if (evt.keyCode === ESCAPE_CODE) {
      evt.preventDefault();
      headerModalHandler();
    }
  };

  const headerModalHandler = () => {
    headerModalOverlay.style.display = 'flex';
    headerModalOverlay.classList.toggle('modal-window__overlay--open');
    headerModalOverlay.classList.toggle('modal-window__overlay--close');
    htmlTag.classList.toggle('html--disabled');
    headerTag.classList.toggle('filter-blur');
    navTag.classList.toggle('filter-blur');
    mainTag.classList.toggle('filter-blur');

    if (headerModalOverlay.classList.contains('modal-window__overlay--open')) {
      document.addEventListener('click', missClick);
      document.addEventListener('keydown', pressEsc);
    } else {
      document.removeEventListener('click', missClick);
      document.removeEventListener('keydown', pressEsc);
      setTimeout(() => {
        headerModalOverlay.style.display = 'none';
      }, 600)
    }
  };

  headerButton.addEventListener('click', headerModalHandler);
  closeModalWindow.addEventListener('click', headerModalHandler);
})();