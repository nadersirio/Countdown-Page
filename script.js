const list = document.getElementById("list");
const yearShow = document.getElementById('years');
const dayShow = document.getElementById('days');
const hoursShow = document.getElementById('hours');
const minutesShow = document.getElementById('minutes');
const secondsShow = document.getElementById('seconds');
const messageFinal = document.getElementById('timer');

const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;
const years = days * 365;

let endDate = null;
let intervalId = null;

restoreLocalStorage();
function restoreLocalStorage() {
  let dateString = localStorage.getItem('date');
  document.getElementById("date").value = dateString;
    if (dateString == "") {
      return;
    }
    startTime();
}

function savingLocalStorage() {
  var date = document.getElementById("date").value;
  localStorage.setItem('date', date);
//var date = document.getElementById("date").value;
//const reserve = date;
//localStorage.setItem('dateSaved', JSON.stringify(reserve));
//let localDate = JSON.parse(localStorage.getItem('dateSaved'));
//console.log(localDate);
}

function startTime() {
  var date = document.getElementById("date").value;
  savingLocalStorage()
  if (date == '') {
    whenValueEmpty();
    return;
  }
  endDate = new Date(date).getTime();
  messageFinal.innerHTML = "";
  clearInterval(intervalId)
  intervalId = setInterval(calc, seconds);
}

function calc() {
  let now = new Date().getTime();
  const difference = endDate - now;
  if (now > endDate) {
    whenValuePassed();
    return;
  }
  showTimeRemaining(difference);
}

function whenValueEmpty() {
    clearInterval(intervalId);
    messageFinal.innerHTML = "<p class='messageFinalOnScreen'> Please, Choose a day!</p>" + "</br>" + "<p>🗓️</p>";
    list.classList.remove("listON");
}

function whenValuePassed() {
  clearInterval(intervalId);
  messageFinal.innerHTML = "<p> That day has passed.⏱️</p>";
  list.classList.remove("listON");
}

function showTimeRemaining(difference) {
  yearShow.innerHTML = Math.floor(difference / years).toString().padStart(2, '0');
  dayShow.innerHTML = Math.floor((difference % years) / days).toString().padStart(2, '0');
  hoursShow.innerHTML = Math.floor((difference % days) / hours).toString().padStart(2, '0');
  minutesShow.innerHTML = Math.floor((difference % hours) / minutes).toString().padStart(2, '0');
  secondsShow.innerHTML = Math.floor((difference % minutes) / seconds).toString().padStart(2, '0');
  list.classList.add("listON");
}

function subscribe() {
  window.open("https://github.com/nadersirio");
}

//Must have
//Ao abrir a tela, trazer um campo para o usuário inserir a data desejada. V
//Ao enviar, iniciar a contagem. V
//O valor da data deve ficar armazenado no navegador do usuário. V

//Nice to have
//Controlar a exibição do calendário com apenas uma classe. V
//https://bobbyhadz.com/blog/javascript-add-leading-zeros-to-number V