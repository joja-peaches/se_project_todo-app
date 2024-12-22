class FormValidator {
    constructor(settings, formEl) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._errorClass = settings.errorClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._formEl = formEl;
    }

    _showInputError(formElement, inputElement, errorMessage) {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = formElement.querySelector(errorElementId);
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };

    _hideInputError(formElement, inputElement) {
      const errorElementId = `#${inputElement.id}-error`;
      const errorElement = formElement.querySelector(errorElementId);
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    };
        
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(
          this._formEl,
          inputElement,
          inputElement.validationMessage
        );
      } else {
        this._hideInputError(this._formEl, inputElement);
      }
    };

    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    _toggleButtonState(inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.disabled = false;
      }
    };

    _setEventListeners() {
        this._inputList = Array.from(
            this._formEl.querySelectorAll(this._inputSelector),
          );
            this._buttonElement = this._formEl.querySelector(
            this._submitButtonSelector,
          );

          this._toggleButtonState(this._inputList, this._buttonElement);
        
          this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState(this._inputList, this._buttonElement);
            });
          });
      console.log(this._buttonElement);
    }

    enableValidation() {
        this._formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
          });
        this._setEventListeners();
      }


      // It should reset the form’s inputs.
      // It should disable the submit button.
      // This method should then be called in index.js, 
      // but only after the form is successfully submitted. 


    resetValidation() {
      this._formEl.addEventListener("submit", (evt) => {
        this._formEl.querySelector(this._inputSelector).value = "";
      });
    }
}

export default FormValidator;