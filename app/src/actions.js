import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_TODOS_PENDING,
    REQUEST_TODOS_SUCCESS,
    REQUEST_TODOS_FAILED
} from './constants';

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});

export const requestTodos = (dispatch) => {
    dispatch({ type: REQUEST_TODOS_PENDING })
    fetch('http://192.168.99.100:4500/read.php')
        .then(response=> response.json())
        .then(data => dispatch({ type: REQUEST_TODOS_SUCCESS }, {payload: data.records}))
        .catch(error => dispatch({ type: REQUEST_TODOS_FAILED }, {payload: error}))
}