"use strict";

(function () {

  var allTeachersButton = document.querySelectorAll('.teachers__button-to-more-about');
  var allTeacherInformationItems = document.querySelectorAll('.teacher-information');

  /*default hidden all TeacherInformationItems and show first TeacherInformationItem start*/
  for (var i = 0; i < allTeacherInformationItems.length; i++) {
    allTeacherInformationItems[i].style.display = "none";
    allTeacherInformationItems[i].classList.remove('teacher-information--active')
  }

  allTeacherInformationItems[0].style.display = "block";
  allTeacherInformationItems[0].classList.add('teacher-information--active')
  /*default hidden all TeacherInformationItems and show first TeacherInformationItem end*/


  var getDate = function (element) {
    return element.getAttribute("date");
  }

  var showNecessaryTeacherItem = function (it) {
    for (var tech = 0; tech < allTeacherInformationItems.length; tech++) {
      allTeacherInformationItems[tech].style.display = "none";
      allTeacherInformationItems[tech].classList.remove('teacher-information--active')
    }

    it.style.display = "block";
    it.classList.add('teacher-information--active');
  }

  /*add click handler for teacher buttons tart*/
  var teachersButtonsClickHandler = function (element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();

      var dateAttributeValue = getDate(element);

      for (var t = 0; t < allTeacherInformationItems.length; t++) {
        if (allTeacherInformationItems[t].id === dateAttributeValue) {
          showNecessaryTeacherItem(allTeacherInformationItems[t]);
        }
      }
    });
  };

  for (var j = 0; j < allTeachersButton.length; j++) {
    teachersButtonsClickHandler(allTeachersButton[j]);
  }
  /*add click handler for teacher buttons end*/


})();