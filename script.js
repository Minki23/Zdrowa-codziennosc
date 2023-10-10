function dayTemplate(day, month, dayOfWeek, breakfast, lunch, dinner) {
  return `<div class="calendar-day">
    <div class="date">
      <h3 class="date">
        ${day} ${month} </br>
        ${dayOfWeek}
      </h3>
    </div>
    <div class="morning">
      <div class="time">Morning</div>
      <p class="food">${breakfast}</p>
    </div>
    <div class="afternoon">
      <div class="time">
        Afternoon
      </div>
      <p class="food">${lunch}</p>
    </div>
    <div class="evening">
      <div class="time">
        Evening
      </div>
      <p class="food">${dinner}</p>
    </div>
</div>`;
}
function dish(name, kcal, time) {
  this.name = name,
    this.kcal = kcal,
    this.time = time
};
var food = localStorage.getItem('food') || [
  new dish('pizza mrozona', 800, ['lunch', 'dinner']),
  new dish('4 sery', 500, ['lunch', 'dinner']),
  new dish('cereal', 200, ['breakfast'])
];
const grid = document.querySelector('.week');
var currentDate = new Date();
function createAWeek() {
  for (var i = 0; i < 7; i++) {
    const date = currentDate.getDate();
    const month = currentDate.toLocaleString("en-US", { month: "long" });
    const dayOfWeek = currentDate.toLocaleDateString("en-US", { weekday: 'long' });
    grid.innerHTML += dayTemplate(date, month, dayOfWeek, foodSelection('breakfast'), foodSelection('lunch'), foodSelection('dinner'));
    currentDate.setDate(currentDate.getDate() + 1);
  }
}
function foodSelection(when) {
  var match = true;
  while (match) {
    var todayFood = food[Math.floor(Math.random() * food.length)];
    if (todayFood.time.includes(when)) {
      return todayFood.name;
    }
  }
}
createAWeek();
var procent = 0;
const slider = document.querySelector(".slider-water");
slider.oninput = function () {
  procent = slider.value;
  document.querySelector(".label-text").innerHTML = `${procent}%(${Math.floor(30 * procent)}ml)`;
  document.querySelector(".fluid").style.bottom = `${-170 + (1.1 * procent)}%`
}
const todoList = document.querySelector('.todo-list-container');
var todos = localStorage.getItem('todos') || 'pomalowac okno';
todos = todos.split(",");
console.log(todos);
function displayTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    todoList.innerHTML += `<li class="todo-item" data-index="${todos.indexOf(todo)}">${todo}</li>`;
  });
  const todoButtons = document.querySelectorAll(".todo-item");
  todoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      todos.splice(button.dataset.index, 1);
      localStorage.setItem('todos', todos);
      displayTodos();
    });
  })
};
displayTodos();

document.querySelector('.add-todo-item').addEventListener('click', () => {
  var name = prompt("wpisz");
  if (name != null) {
    todos.push(name);
    localStorage.setItem('todos', todos);
  }
  displayTodos();
});
var start=100;
// document.querySelector(".dumbell-first-button").addEventListener('click',()=>{
//   if(start>0){
//     start-=5;
//     document.querySelector(".dumbell-finish-percent").style.top=`${start}%`;
//   }
//   document.querySelector(".dumbell-finish-text").innerText=`${-start+100}%`;
// })
// document.querySelector(".dumbell-second-button").addEventListener('click',()=>{
//   document.querySelector(".dumbell-finish-percent").style.top=`100%`;
//   document.querySelector(".dumbell-finish-text").innerText=`0%`;
//   start=100;
// })