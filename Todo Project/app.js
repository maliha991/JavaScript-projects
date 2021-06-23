// SELECTOR
const todoText = document.querySelector(".todo-text");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// EVENT LISTENER
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// FUNCTIONS
function addTodo(event){
    // Prevent form from submitting
    event.preventDefault();
    
    // todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-div");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoText.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // SAVE ITEMS INTO LOCAL STORAGE
    saveLocalTodos(todoText.value);

    //CHECKED button
    const checkedButton = document.createElement("button");
    checkedButton.innerHTML = "<i class='fas fa-check'></i>";
    checkedButton.classList.add("checked-button");
    todoDiv.appendChild(checkedButton);

    // DELETE button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);

    // append todoDiv to todoList
    todoList.appendChild(todoDiv);
    
    //Clearing the input text area
    todoText.value = "";
}

function deleteCheck(event){
    const item = event.target;
    // DELETE TODO

    if(item.classList[0] === "delete-button"){
        const todo = item.parentElement;

        // To make the animation
        todo.classList.add("fall");
        removeLocalTodos(todo.innerText);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
    }

    // CHECK MARK

    if(item.classList[0] === "checked-button"){
        const todo = item.parentElement;
        // console.log(todo);
        todo.classList.toggle("checked");
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("checked")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("checked")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocalTodos(todo){
    let todos = checkLocalTodo();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos = checkLocalTodo();
    todos.forEach(function(todo){
        // todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-div");

        // Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //CHECKED button
        const checkedButton = document.createElement("button");
        checkedButton.innerHTML = "<i class='fas fa-check'></i>";
        checkedButton.classList.add("checked-button");
        todoDiv.appendChild(checkedButton);

        // DELETE button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);

        // append todoDiv to todoList
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    let todos = checkLocalTodo();
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkLocalTodo(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
