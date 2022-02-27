const ageSelector = document.querySelector(".age-selector-heading");
const container = document.querySelector(".container");
const yearBox = document.querySelector(".years");
const monthBox = document.querySelector(".months");
const dateBox = document.querySelector(".dates");
const result = document.querySelector(".result");
const calculateButton = document.querySelector(".calculate");
const tabbedHeading = document.querySelector(".tabbed h2");
const tabContent = document.querySelector(".tab-content");
const tabs = document.querySelector(".tabs");
const yearsTab = document.querySelector(".tab");
const form = document.querySelector("form");
const inputYear = document.querySelector(".inputYear");
const inputMonth = document.querySelector(".inputMonth");
const inputDate = document.querySelector(".inputDate");
const reset = document.querySelector(".reset");

const months = [
  { name: "January", index: 1, days: 31 },
  { name: "February", index: 2, days: 28 },
  { name: "March", index: 3, days: 31 },
  { name: "April", index: 4, days: 30 },
  { name: "May", index: 5, days: 31 },
  { name: "June", index: 6, days: 30 },
  { name: "July", index: 7, days: 31 },
  { name: "August", index: 8, days: 31 },
  { name: "September", index: 9, days: 30 },
  { name: "October", index: 10, days: 31 },
  { name: "November", index: 11, days: 30 },
  { name: "December", index: 12, days: 31 },
];

// console.log();
//state
let selectedYear = null;
let selectedMonth = null;
let selectedDate = null;
let theDate = null;
const ultimateResult = {
  days: null,
  years: null,
  months: null,
  weeks: null,
  hours: null,
  minutes: null,
  seconds: null,
};
let activeTab = null;
let currentBeginYear = 2022;

function HideDomElement(element) {
  element.classList.add("hidden");
}
function populateMonths() {
  const nowDate = new Date(Date.now());
  console.log({ selectedYear });
  if (selectedYear * 1 === nowDate.getFullYear() * 1) {
    console.log("triggered current year");
    for (let i = 0; i < 12; i++) {
      monthBox.innerHTML += `<div class = 'month'>${months[i].name}</div>`;
      if (months[i].index === nowDate.getMonth() + 1) return;
    }
  }
  console.log("no current year trigger");
  months.forEach(
    (item) => (monthBox.innerHTML += `<div class="month">${item.name}</div>`)
  );
}

function populateDates(month) {
  dateBox.innerHTML = null;
  const nowDate = new Date(Date.now());
  if (
    selectedYear * 1 === nowDate.getFullYear() * 1 &&
    selectedMonth.index === nowDate.getMonth() + 1
  ) {
    for (let i = 1; i <= 31; i++) {
      dateBox.innerHTML += `<div class="date">${i}</div>`;
      if (i === nowDate.getDate()) return;
    }
  }
  for (let i = 1; i <= month.days; i++) {
    dateBox.innerHTML += `<div class="date">${i}</div>`;
  }
}
function populateYears(beginYear) {
  yearBox.innerHTML = `<div class = 'year year-change'>Prev</div>`;
  for (let i = 0; i < 18; i++) {
    yearBox.innerHTML += `<div class="year">${beginYear - i}</div>`;
  }
  yearBox.innerHTML += `<div class = 'year year-change'>Next</div>`;
}

populateYears(currentBeginYear);
yearBox.addEventListener("click", function (e) {
  if (e.target.innerText === "Prev" || e.target.innerText === "Next") {
    return;
  }
  selectedYear = e.target.innerText;
  HideDomElement(this);
  ageSelectorHandler();
  console.log({ selectedYear });
});

yearBox.addEventListener("click", function (e) {
  const action = e.target.innerText;
  if (action === "Prev") {
    currentBeginYear -= 18;
    populateYears(currentBeginYear);
  } else if (action === "Next") {
    if (currentBeginYear === 2022) return;
    currentBeginYear += 18;
    populateYears(currentBeginYear);
  }
});

monthBox.addEventListener("click", function (e) {
  selectedMonth = months.find((item) => item.name === e.target.innerText);
  ageSelectorHandler();
  HideDomElement(this);
  console.log({ selectedMonth });
});

dateBox.addEventListener("click", function (e) {
  selectedDate = e.target.innerText;
  ageSelectorHandler();
  enableCalculateButton();
  theDate = new Date(`${selectedMonth.name} ${selectedDate}, ${selectedYear}`);
  console.log({ theDate });
  console.log(selectedDate);
});

function ageSelectorHandler(e) {
  if (
    (this === ageSelector || this === reset) &&
    !container.classList.contains("hidden")
  )
    return HideDomElement(container);
  showResult();
  showDomElement(container);
  if (!selectedYear) {
    return showDomElement(yearBox);
  } else if (selectedYear && !selectedMonth) {
    populateMonths();
    return showDomElement(monthBox);
  } else if (selectedYear && selectedMonth && !selectedDate) {
    populateDates(selectedMonth);
    return showDomElement(dateBox);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  selectedMonth = months.find((item) => item.index === inputMonth.value * 1);
  console.log(inputMonth.value);
  selectedDate = inputDate.value * 1;
  selectedYear = inputYear.value * 1;
  console.log({ selectedDate, selectedYear, selectedMonth });
  theDate = new Date(`${selectedMonth.name} ${selectedDate}, ${selectedYear}`);
  console.log(theDate);
  calculateAndRender();
  inputDate.value = null;
  inputMonth.value = null;
  inputYear.value = null;
});

function showDomElement(element) {
  element.classList.remove("hidden");
}

function isYearBoxShown() {
  return !yearBox.classList.contains("hidden");
}

ageSelector.addEventListener("click", ageSelectorHandler);

const showResult = () => {
  if (!selectedDate && !selectedMonth && !selectedYear) {
    return HideDomElement(result);
  } else {
    showDomElement(result);
  }
  if (selectedDate) {
    result.innerText = result.innerText.replace("DD", selectedDate);
  }
  if (selectedMonth)
    result.innerText = result.innerText.replace("MM", selectedMonth.name);
  if (selectedYear)
    result.innerText = result.innerText.replace("YYYY", selectedYear);
};

function resetResult() {
  result.innerHTML = `<span class="info">Selected Date: </span><span class="selected-date">DD MM YYYY</span>`;
}
function resetFunction(e) {
  theDate = null;
  document.querySelector(".active-tab")?.classList.remove("active-tab");
  selectedDate = null;
  selectedMonth = null;
  selectedYear = null;
  HideDomElement(yearBox);
  HideDomElement(monthBox);
  HideDomElement(dateBox);
  ageSelectorHandler();
  resetResult();
  disableCalculateButton();
  displayTabbedValue();
}
reset.addEventListener("click", resetFunction);

function calculateAndRender(e) {
  if (theDate > Date.now()) {
    console.log("Exceeded current date");
    resetFunction();
    displayTabbedValue("error");
    removeActiveTab();
  }
  const milliSecs = Date.now() - theDate;
  ultimateResult.days = Math.floor(milliSecs / (1000 * 60 * 60 * 24));
  ultimateResult.months = Math.floor(ultimateResult.days / 31);
  ultimateResult.years = Math.floor(ultimateResult.days / 365);
  ultimateResult.weeks = ultimateResult.years * 52;
  ultimateResult.hours = ultimateResult.days * 24;
  ultimateResult.minutes = ultimateResult.hours * 60;
  ultimateResult.seconds = ultimateResult.minutes * 60;
  //   console.log({ days, years, weeks, hours, minutes, seconds });
  yearsTab.classList.add("active-tab");
  activeTab = yearsTab;
  displayTabbedValue();
  startCountingSeconds();
  console.log("continue clicked");
  tabContent.scrollIntoView();
}

tabs.addEventListener("click", function (e) {
  removeActiveTab();
  e.target.classList.add("active-tab");
  activeTab = e.target;
});

function removeActiveTab() {
  document.querySelector(".active-tab")?.classList.remove("active-tab");
}

function displayTabbedValue(error) {
  if (error) {
    return (tabContent.innerText =
      "Mate...There was an error in choosing date, please do it again");
  }
  if (!activeTab) {
    return (tabContent.innerText = "No Date Selected Yet...");
  }
  if (!theDate) {
    return (tabContent.innerText = "First Select a date, Mate...");
  }
  const query = activeTab.innerText.toLowerCase();
  tabContent.innerText = ultimateResult[query] + " " + activeTab.innerText;
}

calculateButton.addEventListener("click", calculateAndRender);

function enableCalculateButton() {
  calculateButton.disabled = false;
  calculateButton.classList.add("calculate-active");
}
function disableCalculateButton() {
  calculateButton.disabled = true;
  calculateButton.classList.remove("calculate-active");
}

function startCountingSeconds() {
  ultimateResult.seconds += 1;
  if (activeTab.innerText === "Seconds")
    tabContent.innerText = ultimateResult.seconds;
  setTimeout(this, 1000);
}
