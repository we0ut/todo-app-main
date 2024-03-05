"use strict";

const formEl = document.querySelector(".form-box");
const inputEl = document.querySelector(".form-input");
const countEl = document.querySelector(".form-items__count");

const containerFormEl = document.querySelector(".form-list-box");
const formListEl = document.querySelector(".form-list-item");
const formBoxEl = document.querySelector(".form-list-box");

const tasks = [];

const changeCount = (el, arrLength) =>
  (el.textContent = arrLength
    ? `${arrLength <= 10 ? arrLength : "10+"} items left`
    : `No items`);
changeCount(countEl, tasks.length);

const closeBtn = (btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".form-list-item").style.display = "none";
    console.log("123");
  });
};

const formItem = (boxEl, arr) => {
  const html = `              
    <li class="form-list-item">
      <div class="form-list-item--flex">
      <input type="checkbox" class="circle" />
      <p class="form-list-text">
      ${arr.slice(-1)}
      </p>
      </div>
      <button class="close-btn">
      <img src="/images/icon-cross.svg" alt="Close button" />
      </button>
    </li>`;

  boxEl.insertAdjacentHTML("afterbegin", html);
};

// let closeEl;
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  if (inputEl.value === "") {
    alert("Please enter a valid task!");
  } else {
    tasks.push(inputEl.value);
    inputEl.value = "";
    changeCount(countEl, tasks.length);
    formItem(formBoxEl, tasks);
    const closeEl = document.querySelector(".close-btn");
    closeBtn(closeEl);
  }
});
