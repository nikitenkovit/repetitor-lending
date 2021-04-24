;(function () {
  const buttonCheckInACourse = document.querySelector('.navigation__button-check-in-a-course');
  const interview = document.querySelector('.interview');
  const showInterview = document.querySelector('.showInterview');
  const buttonClose = document.querySelector('.interview__button-close');
  const TIME_TO_SHOW_POPAP = 30000;
  const TABLET_WIDTH = 767;

  const mainModalWindowHandler = () => {
    interview.classList.toggle('active');
  }

  buttonCheckInACourse.addEventListener('click', mainModalWindowHandler)
  showInterview.addEventListener('click', mainModalWindowHandler)
  buttonClose.addEventListener('click', mainModalWindowHandler)

  if (document.documentElement.clientWidth > TABLET_WIDTH) {
    setTimeout(() => {
      interview.classList.add('active');
    }, TIME_TO_SHOW_POPAP)
  }
})();