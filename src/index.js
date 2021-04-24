import './normalize.css';
import './sass/style.scss';

import './js/nav';
import './js/up-button';
import './js/header-modal-window';
import './js/main-modal-window';
import './js/phone-mask';
import './js/problems-block';
import './js/why-are-we-block';
import './js/teachers';
import './js/reviews';
import './js/yandex-maps';
import smoothscroll from 'smoothscroll-polyfill';
import Slider from "./js/slider";
import Form from "./js/form";

/*smooth scroll polyfill*/

smoothscroll.polyfill();

const anchors = document.querySelectorAll('.anchor');

for (let i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchors[i].getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

/*slider init*/

const allSliders = document.querySelectorAll(`.slider`);

for (var i = 0; i < allSliders.length; i++) {
  const slider = new Slider(allSliders[i]);

  slider.init()
  slider.setHandlers();
  slider.behaviorOnlyReviewsBlock();
}

/*custom scroll bars*/

import {customScrollBars} from "./js/scroll";

customScrollBars();

/*form*/

const allAjaxForm = document.querySelectorAll('.ajaxForm');

for(let i = 0; i < allAjaxForm.length; i++) {
  const form = new Form(allAjaxForm[i])
  form.init();
}
