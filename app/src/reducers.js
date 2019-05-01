import { CHANGE_SEARCH_FIELD } from './constants';

const initialState = {
    searchField: ''
}

//create the function reducer (pure function)
// collection of all the actions that act onto the searchField property of the state
export const searchTodos = (state = initialState, action = {}) => {
    switch (action.type) { //could be an if statement but switch is recommended
        case CHANGE_SEARCH_FIELD:
            //return a new state
                // return Object.assign({}, state, { searchField: action.payload });
                return {...state, searchField: action.payload }
        default:
            return state;
    }
}