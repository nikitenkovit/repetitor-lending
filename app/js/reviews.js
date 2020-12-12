"use strict";

(function () {

  var allTabsLinks = document.querySelectorAll('.reviews__years-link');
  var allTabsItems = document.querySelectorAll('.reviews__list');

  /*default hidden all allTabsItems and show first allTabsItems start*/
  for (var i = 0; i < allTabsItems.length; i++) {
    allTabsItems[i].style.display = "none";
    allTabsLinks[i].classList.remove('reviews__years-link--active');
    allTabsItems[i].classList.remove('reviews__list--active')
  }

  allTabsItems[0].style.display = "block";
  allTabsLinks[0].classList.add('reviews__years-link--active');
  allTabsItems[0].classList.add('reviews__list--active')
  /*default hidden all allTabsItems and show first allTabsItems end*/


  var getHref = function (element) {
    var currentHref = element.href;
    return currentHref.split('#').pop();
  }

  var showNecessaryTeacherItem = function (it) {
    for (var tech = 0; tech < allTabsItems.length; tech++) {
      allTabsItems[tech].style.display = "none";
      allTabsItems[tech].classList.remove('reviews__list--active')
    }

    it.style.display = "block";
    it.classList.add('reviews__list--active')
  }

  /*add click handler for allTabsLinks tart*/
  var tabsLinksClickHandler = function (element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();

      for (var l = 0; l < allTabsLinks.length; l++) {
        allTabsLinks[l].classList.remove('reviews__years-link--active');
      }

      element.classList.add('reviews__years-link--active')

      var hrefAttributeValue = getHref(element);

      for (var t = 0; t < allTabsItems.length; t++) {
        if (allTabsItems[t].id === hrefAttributeValue) {
          showNecessaryTeacherItem(allTabsItems[t]);
        }
      }
    });
  };

  for (var j = 0; j < allTabsLinks.length; j++) {
    tabsLinksClickHandler(allTabsLinks[j]);
  }
  /*add click handler for allTabsLinks end*/


})();