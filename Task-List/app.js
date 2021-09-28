// variable for the projects
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// function to load all even listeners

// loading the function
loadEventListeners();

// the function itself
function loadEventListeners(){
// DOM load event
// DOMContentLoaded is an event
    document.addEventListener('DOMContentLoaded', getTasks);
    // adding task event
    //  note this indicate that an event is added to the var(form)
// the 'submit' indicate the event while the 'addTask' indicate the function
    form.addEventListener('submit', addTask);
// nb: the event will be added in the li itself
    taskList.addEventListener('click', removeTask);
// clear task event
    clearBtn.addEventListener('click',clearTasks );
// filter task event
    filter.addEventListener('keyup', filterTasks);
}

// the reason why we used local storage is because we want it to load from the local storage when the project is loaded.
// Get task from list ul
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
// we want to loop through all the task if any is there
// we basically want to create the dom element
    tasks.forEach(function(task){
        const li = document.createElement('li');
// add class to the li
li.className = 'collection-item';
// create a text node and append to the li
// ie add to the li a text which is the input value
// it seems that appending a link indicates adding something to the link
li.appendChild(document.createTextNode(task));
// create new link element which shows the cancle icon
const link = document.createElement('a');
// adding a class to the link
// nb the secondary-content indicate adding something to the right side in materialize
link.className = 'delete-item secondary-content';
// add icon html
// adding innerHTML indicate adding an html tag to the link ie the <a> tag
link.innerHTML = '<i class="fa fa-remove"></i>';
// append the link to the li 
li.appendChild(link);

// append the li to the ul
taskList.appendChild(li);

    });
}

// adding task event
function addTask(e) {
// nb the if statement indicate that when the variable(taskInput) has 
// no value, then the browser should be alerted nb:the var(taskInput)
// is in the form.
   if(taskInput.value === '') {
       alert('Add a Task');
   }
// when we use the submit event to add a task, then what do we want to do next.
// we want to create li element when clicking add task


// creating li element
const li = document.createElement('li');
// add class to the li
li.className = 'collection-item';
// create a text node and append to the li
// ie add to the li a text which is the input value
// it seems that appending a link indicates adding something to the link
li.appendChild(document.createTextNode(taskInput.value));
// create new link element which shows the cancle icon
const link = document.createElement('a');
// adding a class to the link
// nb the secondary-content indicate adding something to the right side in materialize
link.className = 'delete-item secondary-content';
// add icon html
// adding innerHTML indicate adding an html tag to the link ie the <a> tag
link.innerHTML = '<i class="fa fa-remove"></i>';
// append the link to the li 
li.appendChild(link);

// append the li to the ul
taskList.appendChild(li);

// store in local storage
// ie the task input is now the local storage
storeTaskInLocalStorage(taskInput.value);

// then we clear the input ie making sure the input space is always empty
taskInput.value = '';


    e.preventDefault()
}

// store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
// this is pushing the variable(tasks) into the paremeter
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
// the next thing to be done is to show it inside the ul not only on the local storage
// to do this we will create a function and we will need an event to load for the function to be called
}

// this is the function fpr the removetask
function removeTask(e) {
// we want to target the delete-item
// nb the parent element was used to selct the tag that contain delete-item
// remember that the parentElement is the class<task-list> which started the event
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('are you sure?')){
            e.target.parentElement.parentElement.remove();

            // remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove ls
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });


    localStorage.setItem('tasks', JSON.stringify(tasks));

}



function clearTasks(){
// first way of doing it
    taskList.innerHTML = '';

// faster way
// the while loop indicate while there is still a first child
    while(taskList.firstchild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear from ls
    clearTasksFromLocalStorage();
}

// clear tasks from ls
function clearTasksFromLocalStorage() {
    localStorage.clear();
}



// function for the filter task
// The essense of he filter area is to filter out the text that matches with the lists
function filterTasks(e){
    const text = e.target.value.toLowerCase();
 // queryselector return a node list
// the element selector is or taking all of the list items
 document.querySelectorAll('.collection-item').forEach
 (function(task){
// nb that task is our iterator
     const item = task.firstChild.textContent;
// the  -1 means does not match 
     if(item.toLowerCase().indexOf(text) != -1 ){
         task.style.display = 'block';
     } else {
         task.style.display = 'none';
     }
 });
}