import { SET_TODOS, REMOVE_TODO, store } from '../store.js'
import { todoService } from '../../services/todo.service.js'

export function loadTodos() {
	return todoService.query()
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todo) {
    const type = todo._id ? EDIT_TODO : ADD_TODO

    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
}