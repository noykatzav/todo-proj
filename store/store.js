import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_TODO_COLOR = 'SET_TODO_COLOR'

export const SET_FILTER_BY = 'SET_FILTER_BY'

export const SET_IS_LOADING = 'SET_IS_LOADING'

export const INCREMENT_BY_TEN = 'INCREMENT_BY_TEN'


const initialState = {
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    isLoading: false,
    loggedinUser: userService.getLoggedinUser()
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case REMOVE_TODO:
            return { ...state, todos: state.todos.filter(todo => todo._id !== cmd.todo_id) }

        case SET_TODO_COLOR:
            return { ...state, todos: state.todos.map(todo => todo._id === cmd.todo._id ? {...todo, color: cmd.todo.color} : todo) }
        
        case ADD_TODO:
            return { ...state, todos: [...state.todos, cmd.todo] }
    
        case UPDATE_TODO:
            return { ...state, todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo) }
        
        case SET_FILTER_BY:
            return { ...state, filterBy: cmd.filterBy }
        
        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }
                
        case INCREMENT_BY_TEN:
            const loggedinUser = { ...state.loggedinUser, balance: state.loggedinUser.balance + 10 }
            return { ...state, loggedinUser }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store