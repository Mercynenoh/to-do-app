let tasks = document.getElementById("pending");

let buttontitle = "Add";
let inputField = document.getElementById("inputField");
let inputField_two = document.getElementById("inputField_two");
let inputField_three = document.getElementById("inputField_three");
// inputField_two.value='Mercy'
let inputs = document.getElementsByClassName("checkbox");
// let taskContainer = document.createElement('div')
// let paragraph= document.createElement('h2')
// let paragraph3= document.createElement('h4')
// let dates =document.createElement('p')
// let duedate =document.createElement('p')

// const date = new Date();
// const day = date.getDate();
// const month = date.getMonth();
// const year = date.getFullYear();

class _task {
  constructor(title, desc, duedate) {
    this.title = title;
    this.desc = desc;
    this.duedate = duedate;
  }
}

const taskArr = [];
const completedTasks = [];

const createTask = (title, desc, duedate) => {
  const task = new _task(title, desc, duedate);
  taskArr.push(task);
};
const getTaskById = (id) => {
  return taskArr.find((task) => task.id === id);
};
const getAllTasks = () => {
  return taskArr;
};
const updateTask = (id) => {
  const task = taskArr[id];
  inputField.value = task.title;
  inputField_two.value = task.desc;
  inputField_three.value = task.duedate;
  // taskArr.pop(id, 1)
  let btn1 = document.getElementById("sub"); //update//
  let btn = document.getElementById("sub1"); //add//
  btn.style.display = "none";
  btn1.style.display = "block";

  const clickHandler = (e) => {
    task.title = inputField.value;
    task.desc = inputField_two.value;
    task.duedate = inputField_three.value;
    inputField.value = "";
    inputField_two.value = "";
    inputField_three.value = "";
    btn.style.display = "block";
    btn1.style.display = "none";
    btn1.removeEventListener('click', clickHandler)
    displayTasks();
  }
  btn1.addEventListener("click", clickHandler);
};

const deleteTask = (id) => {
  taskArr.splice(id, 1);
};

// Functions for DOM Manipulation
const addTask = (e) => {
  e.preventDefault();
  createTask(inputField.value, inputField_two.value, inputField_three.value);
  inputField.value = "";
  inputField_two.value = "";
  inputField_three.value = "";
  displayTasks();
};

document.getElementById("my-form").addEventListener("submit", addTask);

removeTask = (taskIndex) => {
  deleteTask(taskIndex);
  displayTasks();
};

displayTasks = () => {
  tasks.innerHTML = "<h1>Pending Tasks</h1>";

  const taskContainers = getAllTasks().map(
    (task, index) => `
    <div class='task'>
      <h2>${task.title}</h2>
      <h4>${task.desc}</h4>
      <p>${task.duedate}</p>
    </div>
    <button onclick="updateTask(${index})" class="update">Update</button>
    <button onclick="removeTask(${index})" class="delete">Delete</button>
    <form>
    <p><input type="checkbox" id="checked"> Completed? </p>
    <button type="button" class="check" onclick="completeTask(${index})">Yes</button>
    <button type="button" class="uncheck" onclick="uncheck()">No</button>
  </form>
  `
  );

  taskContainers.forEach((task) => {
    tasks.insertAdjacentHTML("beforeend", task);
  });
};
completeTask = (index) => {
  let inputs = document.getElementById("checked");
  let dateNow = new Date();
  let duedate = new Date(taskArr[index].duedate);
  let start = dateNow.getTime();
  let due = duedate.getTime();
  let diff = Math.ceil((start - due) / (24 * 3600 * 1000));
  console.log(diff);
  inputs.checked = true;
  if (inputs.checked === true) {
    const completed = taskArr.map(
      (task, index) => `
    <div class='task'>
      <h2>${task.title}</h2>
      <h4>${task.desc}</h4>
      <p>${task.duedate}</p>
      <p> Completed in : ${diff}</p>
    </div>
  `
    );

    completed.forEach((task) => {
      tasks.insertAdjacentHTML("beforeend", task);
    });

    const singlecompletedtask = taskArr[index];

    // Add to completed Array
    completedTasks.push({ diff, ...singlecompletedtask });
    // remove from task array

    taskArr.splice(index, 1);
    displayTasks();
    getCompletedTasks();
  }
};
uncheck = () => {
  let inputs = document.getElementById("checked");
  inputs.checked = false;
};

function getCompletedTasks() {
  let completed = document.querySelector(".completed");
  completed.innerHTML = "<h1>Completed tasks</h1>";

  // let title,desc,duedate,diff=''
  completedTasks.map(function (item, i) {
    const maindiv = document.createElement("div");
    maindiv.style.backgroundColor = "azure";
    maindiv.style.height = "200px";
    maindiv.style.textAlign = "center";
    const h2 = document.createElement("h2");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    h2.textContent = `${item.title}`;
    h4.textContent = `${item.desc}`;
    p.textContent=`${item.duedate}`
    if ('dateNow<=duedate'){
    p2.textContent = `You submitted ${item.diff} days early`;
    }
    else{
      p2.textContent = `You submitted ${item.diff} days late`;
    }
    maindiv.appendChild(h2);
    maindiv.appendChild(h4);
    maindiv.appendChild(p);
    maindiv.appendChild(p2);
    completed.appendChild(maindiv);
  });
}
