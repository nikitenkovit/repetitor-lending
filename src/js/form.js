export default class Form {
  constructor(currentForm) {
    this._form = currentForm;
    this._warnText = this._form.querySelector('.warnText');
    this._allLabel = this._form.querySelectorAll('label');

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  init() {
    this._formSubmitHandler();
  }

  _clearForm() {
    this._form.reset();
  }

  _hiddenAllFields() {
    for (var label = 0; label < this._allLabel.length; label++) {
      this._allLabel[label].classList.add('label-hidden');
    }
  }

  _showAllFields() {
    for (var label = 0; label < this._allLabel.length; label++) {
      this._allLabel[label].classList.remove('label-hidden');
    }
  }

  _showSuccessfulMessage() {
    this._hiddenAllFields();

    setTimeout(() => {
      this._warnText.textContent = `Заявка успешно отправлена!`;
      this._warnText.classList.add('warnText--active');
    }, 300)

    setTimeout(() => {
      this._warnText.classList.remove('warnText--active');
    }, 2000)

    setTimeout(() => {
      this._showAllFields();
    }, 2000)
  }

  _showErrorMessage() {
    this._hiddenAllFields();

    setTimeout(() => {
      this._warnText.textContent = `Во время отправки произошла ошибка`;
      this._warnText.classList.add('warnText--error');
      this._warnText.classList.add('warnText--active');
    }, 300)

    setTimeout(() => {
      this._warnText.classList.remove('warnText--error');
      this._warnText.classList.remove('warnText--active');
    }, 2000)

    setTimeout(() => {
      this._showAllFields();
    }, 2000)
  }

  _sendForm(evt) {
    evt.preventDefault();

    const request = new XMLHttpRequest();

    request.onreadystatechange = () => {
      if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        this._showSuccessfulMessage();

        this._clearForm();
      } else if (request.readyState === XMLHttpRequest.DONE && request.status > 400 ) {
        this._showErrorMessage();
      }
    };

    request.open(this._form.method, this._form.action, true);

    const data = new FormData(this._form);

    request.send(data);
  }

  _formSubmitHandler() {
    this._form.addEventListener(`submit`, (evt) => {
      this._sendForm(evt)
    });
  }
}