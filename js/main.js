// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");

let oldTaskName = "";

// Funções
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add('todo');

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);
    cleanFields();
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const cleanFields = () => {
    editInput.value = "";
    todoInput.value = "";
    searchInput.value = "";
};

const changeTaskName = (text) => {

    document.querySelectorAll('.todo').forEach(element => {
        var h3 = element.querySelector('h3');
        if(element.querySelector('h3').innerText == oldTaskName){
            h3.innerText = text;
        }
    });

};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
        saveTodo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEL = targetEl.parentNode;
    
    //const parentEL = targetEl.closest("div");
    
    if (targetEl.classList.contains("finish-todo")) {
        parentEL.classList.toggle("done");
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEL.remove();
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        oldTaskName = parentEL.querySelector('h3').innerText;
        
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();

    cleanFields();

});

editForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    let newTaskName = document.querySelector("#edit-input").value;
    changeTaskName(newTaskName);

    cleanFields();
    toggleForms();
});