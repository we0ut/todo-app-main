"use strict";

const html = document.querySelector("html");
const formEl = document.querySelector(".form__box");
const inputEl = document.querySelector(".form__input");
const countEl = document.querySelector(".form__items__count");
const circleCheckEl = document.querySelector("#circle-check");
const circleEl = document.querySelector(".circle");
const formListItemBoxEl = document.querySelector(".form__list-item__box");

const iconModeEl = document.querySelector(".icon-mode");
const iconToggleEl = document.querySelector(".icon-toggle-mode");
const bodyEl = document.querySelector(".body");

const containerFormEl = document.querySelector(".form__list-box");
const formBoxEl = document.querySelector(".form__list");
const activeBtnEl = document.querySelector(".active-btn");
const completedBtnEl = document.querySelector(".completed-btn");
const allBtnEl = document.querySelector(".all-btn");
const clearAllBtnEl = document.querySelector(".form__state-btn--clear");

const tasks = [];

const changeCount = (el, arrLength) =>
  (el.textContent = arrLength
    ? `${arrLength <= 10 ? arrLength : "10+"} items left`
    : `No items`);
changeCount(countEl, tasks.length);

const uniqueId = () => String(Date.now()).slice(-6);

const removeTask = (taskId) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    changeCount(countEl, tasks.length);
  }
};

const closeBtn = (boxEl, taskId) => {
  const closeEl = document.querySelector(`#delete-${taskId}`);
  closeEl.addEventListener("click", () => {
    boxEl.removeChild(closeEl.parentElement);
    removeTask(taskId);
  });
};

const displayItem = (boxEl, task) => {
  const html = `
    <li class="form__list-item" data-complete="${task.isCompleted}">
      <div class="form__list-item--flex">
        <input type="checkbox" id="check-${task.id}" class="circle" ${
    task.isCompleted ? "checked" : ""
  }/>
        <p class="form__list-text">${task.content}</p>
      </div>
      <button class="close-btn" id="delete-${task.id}">
        <img src="/images/icon-cross.svg" class="close-img" alt="Close button" />
      </button>
    </li>`;
  changeCount(countEl, tasks.length);
  boxEl.insertAdjacentHTML("afterbegin", html);
  closeBtn(boxEl, task.id);
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputEl.value === "") {
    alert("Please enter a valid task!");
  } else {
    const formTask = {
      content: inputEl.value,
      id: uniqueId(),
      isCompleted: circleCheckEl.checked,
    };
    tasks.push(formTask);
    inputEl.value = "";
    displayItem(containerFormEl, formTask);
  }
});

containerFormEl.addEventListener("change", (e) => {
  const checkbox = e.target;
  const taskId = checkbox.id.split("-")[1];
  const task = tasks.find((task) => task.id === taskId);
  task.isCompleted = checkbox.checked;
});

tasks.forEach((task) => {
  displayItem(containerFormEl, task);
});

activeBtnEl.addEventListener("click", () => {
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  displayTasks(activeTasks);
});

completedBtnEl.addEventListener("click", () => {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  displayTasks(completedTasks);
});

allBtnEl.addEventListener("click", () => {
  displayTasks(tasks);
});

clearAllBtnEl.addEventListener("click", () => {
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  tasks.splice(0, tasks.length, ...incompleteTasks);
  containerFormEl.innerHTML = "";
  tasks.forEach((task) => {
    displayItem(containerFormEl, task);
  });
  changeCount(countEl, incompleteTasks.length);
});

const displayTasks = (tasksArray) => {
  containerFormEl.innerHTML = "";
  tasksArray.forEach((task) => {
    displayItem(containerFormEl, task);
  });
};

const iconChange = (iconSrc) => {
  iconToggleEl.src = iconSrc;
};

iconModeEl.addEventListener("click", function () {
  const isDark = html.getAttribute("data-dark") === "false";

  isDark
    ? html.setAttribute("data-dark", "true")
    : html.setAttribute("data-dark", "false");

  isDark
    ? iconChange("images/icon-sun.svg")
    : iconChange("images/icon-moon.svg");
});
