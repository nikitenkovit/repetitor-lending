;(function () {
  const allTeachersButton = document.querySelectorAll('.teachers__button-to-more-about');
  const allTeacherInformationItems = document.querySelectorAll('.teacher-information');

  /*default hidden all TeacherInformationItems and show first TeacherInformationItem start*/
  for (let i = 0; i < allTeacherInformationItems.length; i++) {
    allTeacherInformationItems[i].style.display = "none";
    allTeacherInformationItems[i].classList.remove('teacher-information--active')
  }

  allTeacherInformationItems[0].style.display = "block";
  allTeacherInformationItems[0].classList.add('teacher-information--active')
  /*default hidden all TeacherInformationItems and show first TeacherInformationItem end*/

  const getDate = (element) => {
    return element.getAttribute("date");
  };

  const showNecessaryTeacherItem = (it) => {
    for (let i = 0; i < allTeacherInformationItems.length; i++) {
      allTeacherInformationItems[i].style.display = "none";
      allTeacherInformationItems[i].classList.remove('teacher-information--active')
    }

    it.style.display = "block";
    it.classList.add('teacher-information--active');
  };

  /*add click handler for teacher buttons tart*/
  const teachersButtonsClickHandler = (element) => {
    element.addEventListener('click', (evt) => {
      evt.preventDefault();

      const dateAttributeValue = getDate(element);

      for (let i = 0; i < allTeacherInformationItems.length; i++) {
        if (allTeacherInformationItems[i].id === dateAttributeValue) {
          showNecessaryTeacherItem(allTeacherInformationItems[i]);
        }
      }
    });
  };

  for (let i = 0; i < allTeachersButton.length; i++) {
    teachersButtonsClickHandler(allTeachersButton[i]);
  }
  /*add click handler for teacher buttons end*/
})();