//Model
let todos = [];

const savedTodos = JSON.parse(localStorage.getItem('todos'));

todos = savedTodos;
function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();

    todos.push({ title: title, dueDate: dueDate, id: id });

    saveTodos();
}

function removeTodo(idToDelete) {
    todos = todos.filter(todo => todo.id !== idToDelete);

    saveTodos();
}

function toggleTodo(todoId, checked) {
    todos.forEach(todo => {
        if (todo.id === todoId) {
            todo.isDone = checked;
        }
    });

    saveTodos();
}

function setEditing(todoId) {
    todos.forEach((todo) => {
        if (todo.id === todoId) {
            todo.isEditing = true;
        }
    });
    saveTodos();
}

function updateTodo(todoId, newTitle, newDate) {
    todos.forEach(todo => {
        if (todo.id === todoId) {
            todo.title = newTitle;
            todo.dueDate = newDate;
            todo.isEditing = false;
        }
    });
    saveTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Controller 
function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;
    if(textbox !== null && title === ''){
        alert('Please Enter Title');
        return;
    }

    const datePicker = document.getElementById('datePicker');
    const dueDate = datePicker.value;

    createTodo(title, dueDate);
    render();
}

function deleteTodo(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    removeTodo(idToDelete);
    render();
}

function checkTodo(event) {
    const checkBox = event.target;
    const todoId = checkBox.dataset.todoId;
    const checked = checkBox.checked;

    toggleTodo(todoId, checked);
    render();
}

function onEdit(event) {
    const editButton = event.target;
    const todoId = editButton.dataset.todoId;

    setEditing(todoId);
    render();
}

function onUpdate(event){
    const updateButton = event.target;
    const todoId = updateButton.dataset.todoId;

    const textbox = document.getElementById('edit-title-' + todoId);
    if(textbox !== null && textbox.value === ''){
        alert('Please Enter Title');
        return;
    }
    const newTitle = textbox.value;

    const datePicker = document.getElementById('edit-date-' + todoId);
    const newDate = datePicker.value;
    console.log('hello');

    updateTodo(todoId, newTitle, newDate);
    render();
}

function onCancelling(event){
    const cancelButton = event.target;
    const todoId = cancelButton.dataset.todoId;

    setCancel(todoId);
    render();
}

function setCancel(todoId){
    todos.forEach(todo => {
        if(todo.id === todoId){
            todo.isEditing = false;
        }
    });
    saveTodos();
}

//View
function render() {
    document.getElementById('todo-list').innerHTML = '';
    todos.forEach(todo => {
        const element = document.createElement('div');
        element.className = 'elements';

        if(todo.isEditing === true){
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.placeholder = 'Edit title';
            textbox.className = 'textboxEditor';
            textbox.id = 'edit-title-' + todo.id;
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.className = 'dateEdit';
            datePicker.id = 'edit-date-' + todo.id;
            element.appendChild(datePicker);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.className = 'updateTodo';
            updateButton.dataset.todoId = todo.id;
            updateButton.onclick = onUpdate;
            element.appendChild(updateButton);

            const cancelButton = document.createElement('button');
            cancelButton.innerText = 'Cancel';
            cancelButton.className = 'cancelEdit';
            cancelButton.dataset.todoId = todo.id;
            cancelButton.onclick = onCancelling;
            element.appendChild(cancelButton);

            const todoList = document.getElementById('todo-list');
            todoList.appendChild(element);

            return;
        }

        element.innerText = todo.title + ' ' + todo.dueDate;

        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'checkBox';
        checkBox.onchange = checkTodo;
        checkBox.dataset.todoId = todo.id;
        checkBox.checked = todo.isDone === true ?
            true : false;
        element.prepend(checkBox);

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'editButton';
        editButton.onclick = onEdit;
        editButton.dataset.todoId = todo.id;
        element.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'X';
        deleteButton.className = 'deleteButton';
        deleteButton.onclick = deleteTodo;
        deleteButton.id = todo.id;
        element.appendChild(deleteButton);

        const todoList = document.getElementById('todo-list');
        todoList.appendChild(element);

    });
}

render();