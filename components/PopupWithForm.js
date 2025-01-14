import Popup from './Popup.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit, handleTotal }) {
        super({ popupSelector });
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._inputList = this._popupForm.querySelectorAll(".popup__input");
        this._handleTotal = handleTotal;
    }
        _getInputValues() {
            const values = {};
            this._inputList.forEach((input) => {
                values[input.name] = input.value;
                values.id = uuidv4();
            });
            return values;
        }

        getForm() {
            return this._popupForm;
        }

        setEventListeners() {
            super.setEventListeners();
            this._popupForm.addEventListener("submit", (evt) => {
                evt.preventDefault();
                const inputValues = this._getInputValues();
                this._handleFormSubmit(inputValues);
            });
        }
    };

export default PopupWithForm;