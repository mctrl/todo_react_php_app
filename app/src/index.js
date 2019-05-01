import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import App from './components/App';
import { Provider }  from 'react-redux';
import {createStore, applyMiddleware, combineReducers } from 'redux';
import { searchTodos, requestTodos } from './reducers'; //change this to root reducer when we have it

const logger = createLogger();
const rootReducer = combineReducers( { searchTodos, requestTodos } );
const store = createStore(rootReducer, applyMiddleware( thunkMiddleware, logger)); 

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , document.getElementById('root'));

