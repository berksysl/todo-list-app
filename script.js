const taskInput = document.querySelector('.task-input input');
const taskBox = document.querySelector('.task-box');
//Getting localstorage "todo-list" value
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showToDo(){
    let liElement = "";
    if(todos){
        todos.forEach((todo,id) => {
            let isCompleted = todo.status == "completed" ? "checked" : ""; 
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
        </li>`
        }
        );
    }
    taskBox.innerHTML = liElement;
}

showToDo();

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!todos){
            todos = [];
        }
        taskInput.value = "";
        let taskInfo = {name: userTask, status: "pending"}
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showToDo();
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
    showToDo();
}

function editTask(taskId, taskName) {
    taskInput.value = taskName;
}