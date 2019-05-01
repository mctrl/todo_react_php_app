import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider }  from 'react-redux';
import {createStore} from 'redux';
import { searchTodos } from './reducers'; //change this to root reducer when we have it

const store = createStore(searchTodos); //change this to rootReducer when we have it

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , document.getElementById('root'));

