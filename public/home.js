'use strict';

$(() => {
    $('.newTodo').click(openNewTodoModal);
    $('form.newTodoForm').submit(createNewTodo);
    $('.todoList').on('click', '.isComplete', changeCheckbox);
});

function changeCheckbox(e) {
    e.preventDefault();

    var id = $(e.target).closest('tr').data('id');

    $.ajax(`/api/todos/${id}/toggle`, {
        method: 'PUT'
    }).done(data => {
        $(e.target).prop('checked', data.newValue);
    }).fail(err => {
        console.error('ERROR!!!!', err);
    });
}

function createNewTodo(e) {
    e.preventDefault();


    var todo = {
      desc: $('#newTodoDesc').val(),
      dueDate: $('#newTodoDueDate').val()
    }

    $('#newTodoDesc').val('');
      $('#newTodoDueDate').val('');

    $.post('/api/todos', todo).done(newTodo => {
        newTodo.dueDate = moment(newTodo.dueDate, 'X').format('l');
        newTodo.createdAt = moment(newTodo.createdAt, 'X').format('lll');

        var $todo = $('.template').clone();
        $todo.removeClass('template');
        $todo.data('id', newTodo.id);

        console.log('newTodo.id', newTodo.id);
        $todo.find('.createdAt').text(newTodo.createdAt);
        $todo.find('.dueDate').text(newTodo.dueDate);
        $todo.find('.desc').text(newTodo.desc);
        $('.todoList').append($todo);

        $('.modal').modal('hide');
    }).fail(err => {
        console.error('ERROR!!!!', err);
    });
}

function openNewTodoModal() {
    $('.modal').modal('show');
}
