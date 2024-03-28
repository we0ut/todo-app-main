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
const mobileSourceEl = document.querySelector("#mobile-source");
const desktopSourceEl = document.querySelector("#desktop-source");
const bodyEl = document.querySelector(".body");

const containerFormEl = document.querySelector(".form__list-box");
const formBoxEl = document.querySelector(".form__list");
const allBtnEl = document.querySelectorAll(".all-btn");
const activeBtnEl = document.querySelectorAll(".active-btn");
const completedBtnEl = document.querySelectorAll(".completed-btn");
const clearAllBtnEl = document.querySelector(".form__state-btn--clear");
const everyBtnEl = document.querySelectorAll(".form__state-btn");

let tasks = [];

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
    setLocalStorage();
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

const setLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));

  if (!data) return;

  tasks = data;
  tasks.forEach((task) => {
    displayItem(containerFormEl, task);
  });
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
    setLocalStorage();
    inputEl.value = "";
    displayItem(containerFormEl, formTask);
  }
});

containerFormEl.addEventListener("change", (e) => {
  const checkbox = e.target;
  const taskId = checkbox.id.split("-")[1];
  const task = tasks.find((task) => task.id === taskId);
  task.isCompleted = checkbox.checked;
  setLocalStorage();
});

everyBtnEl.forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelector(".active")?.classList.remove("active");
    el.classList.add("active");
  });
});

activeBtnEl.forEach((el) => {
  el.addEventListener("click", () => {
    const activeTasks = tasks.filter((task) => !task.isCompleted);
    displayTasks(activeTasks);
  });
});

completedBtnEl.forEach((el) => {
  el.addEventListener("click", () => {
    const completedTasks = tasks.filter((task) => task.isCompleted);
    displayTasks(completedTasks);
  });
});

allBtnEl.forEach((el) => {
  el.addEventListener("click", () => {
    displayTasks(tasks);
  });
});

clearAllBtnEl.addEventListener("click", () => {
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  tasks = incompleteTasks;
  containerFormEl.innerHTML = "";
  tasks.forEach((task) => {
    displayItem(containerFormEl, task);
  });
  changeCount(countEl, incompleteTasks.length);
  setLocalStorage();
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

const backgroundImageChange = (desktopSrc, mobileSrc) => {
  desktopSourceEl.src = desktopSrc;
  mobileSourceEl.srcset = mobileSrc;
};

iconModeEl.addEventListener("click", function () {
  const isDark = html.getAttribute("data-dark") === "false";

  isDark
    ? html.setAttribute("data-dark", "true")
    : html.setAttribute("data-dark", "false");

  isDark
    ? iconChange("images/icon-sun.svg")
    : iconChange("images/icon-moon.svg");

  if (desktopSourceEl.src.includes("bg-desktop-light")) {
    backgroundImageChange(
      "/images/bg-desktop-dark.jpg",
      "/images/bg-mobile-dark.jpg"
    );
  } else {
    backgroundImageChange(
      "/images/bg-desktop-light.jpg",
      "/images/bg-mobile-light.jpg"
    );
  }
});

getLocalStorage();
