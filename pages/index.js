import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addToDoPopup = new PopupWithForm({ 
  popupSelector: "#add-todo-popup", 
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;
    const id = uuidv4();
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const values = { name, date, id };
    renderTodo(values);
    addToDoPopup.close();
  }, 
  handleTotal
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
  todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

function handleTotal(completed) {
  if (completed) {
    todoCounter.updateTotal(true);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete, handleTotal);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const newToDo = generateTodo(item);
    todosList.append(newToDo);    
  },
  containerSelector: ".todos__list" }
);

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

const renderTodo = (data) => {
  const todo = generateTodo(data);
  section.addItem(todo);
};

addTodoButton.addEventListener("click", () => {
  addToDoPopup.open();
});

addToDoPopup.setEventListeners();

newTodoValidator.enableValidation();