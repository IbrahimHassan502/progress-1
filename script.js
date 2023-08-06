"use strict";
//============ main array
let dayArray = [];
if (window.localStorage.getItem("dayArray")) {
  dayArray = JSON.parse(window.localStorage.getItem("dayArray"));
}
// =========== adding a day ===========
let addDayButton = document.querySelector(".add-day");
addDayButton.addEventListener("click", () => {
  dayArray.push({
    date: new Date(),
    id: new Date(),
    rate: "un-rated",
    tasks: [],
  });
  window.localStorage.setItem("dayArray", JSON.stringify(dayArray));
  let day = document.createElement("div");
  day.classList.add("day");
  day.innerHTML = `
    <p class="add-heading">add task</p>
    <button class="add-icon add-task">+</button>
  `;
  let dayContainer = document.querySelector(".day-container");
  dayContainer.prepend(day);
});
//============ adding a day ===========

// =========== generate cutsom-made select
function createSelect(name, ...arr) {
  // creating select container
  let selectContainer = document.createElement("div");
  selectContainer.classList.add(`select-container`, `select-${name}-container`);
  // creating the ui select
  let select = document.createElement("div");
  select.classList.add(`select`, `select-${name}`);
  select.innerHTML = `
    <p> task ${name} </p>
    <span class='select-button'>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-down"
        viewBox="0 0 16 16"
        >
            <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
        </svg>
  </span>
    `;
  selectContainer.append(select);
  // creating the select menu
  let selectList = document.createElement("ul");
  selectList.classList.add("list", `${name}-list`, "hidden");
  // adding options
  arr.forEach((optionName) => {
    let option = document.createElement("li");
    option.setAttribute("data-value", optionName.split(" ").join("-"));
    option.textContent = optionName;
    selectList.append(option);
  });

  selectContainer.append(selectList);
  return selectContainer;
}
// =========== generate cutsom-made select

// =========== form settings ===================

//adding custom made selects to the form
let taskFormInput = document.querySelector(".task-form input");
taskFormInput.after(
  createSelect(
    "category",
    "learning",
    "reading",
    "problem solving",
    "side project"
  ),
  createSelect(
    "level",
    "simple",
    "takes some time",
    "takes time",
    "takes much time"
  )
);
// preveneting submit & refresh
let taskForm = document.querySelector(".task-form");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (taskFormInput.value) {
    console.log("right");
  } else {
    taskFormInput.style.borderColor = "red";
  }
});
// showing form
let dayContainer = document.querySelector(".day-container");
dayContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-task")) {
    taskForm.classList.remove("hidden");
  }
});
// =========== form settings ===================

// adding a fucntion to remove hidden class from the list when click on the select arrow
let selectButtons = document.querySelectorAll(".select-button");
selectButtons.forEach((button) =>
  button.addEventListener("click", (e) => {
    e.currentTarget.parentElement.nextSibling.classList.toggle("hidden");
  })
);

// changing the text inside the select to the chosen option
let selectLists = document.querySelectorAll(".select-container ul");
selectLists.forEach((selectList) => {
  selectList.addEventListener("click", (e) => {
    if (e.target.localName === "li") {
      let selectText = e.currentTarget.previousSibling.children;
      selectText = [...selectText].find((ele) => ele.localName === "p");
      selectText.textContent = e.target.textContent;
      e.currentTarget.classList.add("hidden");
    }
  });
});
