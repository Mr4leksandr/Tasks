const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");
const filterInput = document.querySelector("#filter");
const clearBtn = document.querySelector(".clear-tasks");

loadEventListeners();

function loadEventListeners(){
    //Add a task event
    form.addEventListener('submit', addTask);
    //Remove task
    taskList.addEventListener('click', removeTask);
    //Clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks
    filterInput.addEventListener('keyup', filterTasks);
}

function addTask(event){
    //check for empty input
    if(taskInput.value === ''){
        alert('Enter a Task');
    }

    //Create an li element to add to the ul
    const li = document.createElement('li');
    //Add a clear name to the li element
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    //create a new anchor element
    const link = document.createElement('a');
    //add a class to the a element
    link.className = 'delete-item secondary-content';
    link.innerHTML = 'X';
    li.appendChild(link);
    taskList.appendChild(li);

    taskInput.value = '';

    //store in LocalStorage
    storeInLocalStorage(taskInput.value);

    event.preventDefault();
}

function removeTask(event){
    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure about that')){
            event.target.parentElement.remove();
        }
    }
}

function clearTasks(){
    if(confirm('Are you sure about that')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        } 
    }
}

function filterTasks(event){
    const userFilter = event.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(userFilter) != -1){
            task.style.display = 'block';
        } else{
            task.style.display = 'none';
        }
    });
}

function storeInLocalStorage(task){
    //declare an array to read from the local storage
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks =[];
    } else{
        task = JSON.parse(localStorage.getItem('tasks'));
    }

    //add a tasks to the tasks array
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}