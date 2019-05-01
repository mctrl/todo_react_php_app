import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import App from './components/App';
import { Provider }  from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { searchTodos } from './reducers'; //change this to root reducer when we have it

const logger = createLogger();
const store = createStore(searchTodos, applyMiddleware( thunkMiddleware, logger)); //change this to rootReducer when we have it

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , document.getElementById('root'));

