const taskInput = document.querySelector('.task-input input');
const taskBox = document.querySelector('.task-box');
//Getting localstorage "todo-list" value
let todos = JSON.parse(localStorage.getItem("todo-list"));

function showToDo(){
    let liElement = "";
    todos.forEach((todo,id) => {
        liElement += 
        `<li class="task">
            <label for="${id}">
                <input type="checkbox" id="${id}">
                <p>${todo.name}</p>
            </label>
            <div class="settings">
                <i class="fa-solid fa-ellipsis"></i>
                <ul class="task-menu">
                    <li><i class="uil uil-pen"></i>Edit</li>
                    <li><i class="uil uil-trash"></i>Remove</li>
                </ul>
            </div>
    </li>`
    }
    );
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