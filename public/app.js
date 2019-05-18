jQuery(
    $.getJSON("/api/todos")
    .then(addTodos),

    $('#todoInput').keypress(function() {
        if(event.which === 13) {
           createNewTodo(); 
        }
    }),

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        removeTodo($(this).parent())
    }),

    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    }),
)

function removeTodo(todo) {
    var clickedId = todo.data("id"),
            deleteUrl = 'api/todos/' + clickedId;
        $.ajax({
            method: 'DELETE',
            url: deleteUrl
        }).then(function() {
            todo.remove();
        })
}

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}
function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
        newTodo.data("id", todo._id);
        newTodo.data("completed", todo.completed)
    if(todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createNewTodo() {
    var taskName = $('#todoInput').val();
    if(!$.trim(taskName) == "") {
        $.post("/api/todos", {name: taskName})
        .then(function(newTodo) {
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch(function(err) {
            console.log(err)
        })
    }
}

function updateTodo(todo) {
    var updateUrl = 'api/todos/' + todo.data("id"),
        isDone = !todo.data('completed'),
        updatedData = {completed: isDone}
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: updatedData
    }).then(function(updateTodo) {
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
    
}