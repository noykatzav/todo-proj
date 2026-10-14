import { SET_TODOS, REMOVE_TODO, SET_FILTER_BY, SET_IS_LOADING, store } from '../store.js'
import { todoService } from '../../services/todo.service.js'

export function loadTodos(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true})

	return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
        .finally(()=> store.dispatch({ type: SET_IS_LOADING, isLoading: false}))
}

export function removeTodo(todoId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true})

    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
        .finally(()=> store.dispatch({ type: SET_IS_LOADING, isLoading: false}))
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO

    store.dispatch({ type: SET_IS_LOADING, isLoading: true})

    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .finally(()=> store.dispatch({ type: SET_IS_LOADING, isLoading: false}))
}

export function saveFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}