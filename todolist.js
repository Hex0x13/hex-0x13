
let todos = [];

function createTodo(title, dueDate) {
    const id = '' + new Date().getTime();

    todos.push({ title: title, dueDate: dueDate, id: id });

}

function removeTodo(idToDelete) {
    todos = todos.filter(todo => todo.id !== idToDelete);


}

function toggleTodo(todoId, checked) {
    todos.forEach(todo => {
        if (todo.id === todoId) {
            todo.isDone = checked;
        }
    });

}

function setEditing(todoId) {
    todos.forEach((todo) => {
        if (todo.id === todoId) {
            todo.isEditing = true;
        }
    });

}

function updateTodo(todoId, newTitle, newDate) {
    todos.forEach(todo => {
        if (todo.id === todoId) {
            todo.title = newTitle;
            todo.dueDate = newDate;
            todo.isEditing = false;
        }
    });

}

function setCancel(todoId) {
    todos.forEach(todo => {
        if (todo.id === todoId) {
            todo.isEditing = false;
        }
    });
}


function addTodo() {
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;
    if(textbox !== null && title === ''){
        alert('Please Enter Title');
        return;
    }

    const datePicker = document.getElementById('datePicker');
    const dueDate = datePicker.value;
    textbox.value = '';

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


function render() {
    document.getElementById('todo-list').innerHTML = '';
    todos.forEach(todo => {
        const element = document.createElement('div');
        element.className = 'elements';

        const spanDate = document.createElement('span');
        spanDate.className = 'date-style';
        spanDate.innerText = todo.dueDate;

        if(todo.isEditing === true){
            element.style = 'grid-template-columns: 30px 1fr 16% 80px;';

            const cancelButton = document.createElement('button');
            cancelButton.innerText = 'x';
            cancelButton.className = 'cancelEdit';
            cancelButton.dataset.todoId = todo.id;
            cancelButton.onclick = onCancelling;
            element.prepend(cancelButton);
            
            const textbox = document.createElement('input');
            textbox.type = 'text';
            textbox.placeholder = 'Edit title';
            textbox.className = 'textboxEditor';
            textbox.id = 'edit-title-' + todo.id;
            textbox.value = todo.title;
            element.appendChild(textbox);

            const datePicker = document.createElement('input');
            datePicker.type = 'date';
            datePicker.className = 'dateEdit';
            datePicker.id = 'edit-date-' + todo.id;
            datePicker.value = todo.dueDate;
            element.appendChild(datePicker);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.className = 'updateTodo';
            updateButton.dataset.todoId = todo.id;
            updateButton.onclick = onUpdate;
            element.appendChild(updateButton);

            const todoList = document.getElementById('todo-list');
            todoList.appendChild(element);

            return;
        }

        element.innerText = todo.title;
        element.style = 'grid-template-columns: 30px 1fr 50px 40px;';

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
        element.appendChild(spanDate);
        todoList.appendChild(element);

    });
}

render();
