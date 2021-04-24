;(function () {
  const allTabsLinks = document.querySelectorAll('.reviews__years-link');
  const allTabsItems = document.querySelectorAll('.reviews__list');

  /*default hidden all allTabsItems and show first allTabsItems start*/

  for (let tabItem = 0; tabItem < allTabsItems.length; tabItem++) {
    allTabsItems[tabItem].style.display = "none";
    allTabsItems[tabItem].classList.remove('reviews__years-link--active');
    allTabsItems[tabItem].classList.remove('reviews__list--active')
  }

  allTabsItems[0].style.display = "flex";
  allTabsLinks[0].classList.add('reviews__years-link--active');
  allTabsItems[0].classList.add('reviews__list--active')
  /*default hidden all allTabsItems and show first allTabsItems end*/


  const getHref = (element) => {
    const currentHref = element.href;

    return currentHref.split('#').pop();
  };

  const showNecessaryTeacherItem = (it) => {
   for (let item = 0; item < allTabsItems.length; item++) {
     allTabsItems[item].style.display = "none";
     allTabsItems[item].classList.remove('reviews__list--active')
   }

    it.style.display = "flex";
    it.classList.add('reviews__list--active')
  };

  /*add click handler for allTabsLinks tart*/
  const tabsLinksClickHandler = (element) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();

      for (let tabLink = 0; tabLink < allTabsLinks.length; tabLink++) {
        allTabsLinks[tabLink].classList.remove('reviews__years-link--active');
      }

      element.classList.add('reviews__years-link--active')

      const hrefAttributeValue = getHref(element);

      for (let item = 0; item < allTabsItems.length; item++) {
        if (allTabsItems[item].id === hrefAttributeValue) {
          showNecessaryTeacherItem(allTabsItems[item]);
        }
      }
    });
  };

  for (let tabLink = 0; tabLink < allTabsLinks.length; tabLink++) {
    tabsLinksClickHandler(allTabsLinks[tabLink]);
  }
  /*add click handler for allTabsLinks end*/
})();