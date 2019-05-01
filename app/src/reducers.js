import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_TODOS_PENDING,
    REQUEST_TODOS_SUCCESS,
    REQUEST_TODOS_FAILED
} from './constants';

const initialStateSearch = {
    searchField: ''
}

//create the function reducer (pure function)
// collection of all the actions that act onto the searchField property of the state
export const searchTodos = (state = initialStateSearch, action = {}) => {
    switch (action.type) { //could be an if statement but switch is recommended
        case CHANGE_SEARCH_FIELD:
            //return a new state
                // return Object.assign({}, state, { searchField: action.payload });
                return {...state, searchField: action.payload }
        default:
            return state;
    }
}

const initialStateRobots = {
    todos: [],
    isPending: false,
    error: ''
}

export const requestTodos = (state = initialStateRobots, action = {}) => {
    switch (action.type) {
        case REQUEST_TODOS_PENDING:
            return {...state, isPending: true };
        case REQUEST_TODOS_SUCCESS:
            return {...state, todos: action.payload, isPending: false };
        case REQUEST_TODOS_FAILED:
            return {...state, error: action.payload, isPending: false };
        default:
            return state;
    }
}