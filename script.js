const taskInput = document.querySelector('.task-input input');
const taskBox = document.querySelector('.task-box');
const filters = document.querySelectorAll('.filters span');
const clearAll = document.querySelector('.clear-btn');
//Getting localstorage "todo-list" value
let todos = JSON.parse(localStorage.getItem("todo-list"));
let editId;
let isEditedTask = false;

function showToDo(filter){
    let liElement = "";
    if(todos){
        todos.forEach((todo,id) => {
            let isCompleted = todo.status == "completed" ? "checked" : ""; 
            if(filter == todo.status || filter == "all"){
            liElement += 
            `<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Remove</li>
                    </ul>
                </div>
            </li>`;
            }
        }
        );
    }
    taskBox.innerHTML = liElement || `<span>You don't have any task here</span>`;
}

showToDo("all");

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!isEditedTask){
            if(!todos){
                todos = [];
            }
            let taskInfo = {name: userTask, status: "pending"};
            todos.push(taskInfo);
        } else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showToDo("all");
    }
})

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }
    else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    })
}

function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDo("all");
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector('span.active').classList.remove("active");
        btn.classList.add("active");
        showToDo(btn.id);
    })
})

clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showToDo("all");
})