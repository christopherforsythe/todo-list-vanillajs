//Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //Put newTodo inside todoDiv
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    //ADD TO PARENT DIV
    todoDiv.appendChild(completedButton);
    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    //ADD TO PARENT DIV
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //CLEAR TODO INPUT VALUE
    todoInput.value = "";
}


function deleteCheck(event){
    const item = event.target;
    //DELETE TODO
    if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    //ANIMATION TO REMOVE TRASH
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
       todo.remove();
    });
    }

    //CHECK MARK
    if(item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

//TODO FILTER
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
              break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //CHECK - IS THERE ALREADY ITEMS IN STORAGE?
    let todos;
    //IF THERE ARE NO SAVED TODOS, CREATE AN EMPTY ARRAY.
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
   // Add todo into todos array
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    //CHECK - IS THERE ALREADY ITEMS IN STORAGE?
    //IF THERE ARE NO SAVED TODOS, CREATE AN EMPTY ARRAY.
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    //Put newTodo inside todoDiv
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    //ADD TO PARENT DIV
    todoDiv.appendChild(completedButton);
    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    //ADD TO PARENT DIV
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    //CHECK - IS THERE ALREADY ITEMS IN STORAGE?
    //IF THERE ARE NO SAVED TODOS, CREATE AN EMPTY ARRAY.
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

