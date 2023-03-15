import React from 'react';
import reactDom from 'react-dom';
import App from './app.js';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import allReducers from './reducers/index.js';

import { BrowserRouter as Router} from "react-router-dom";


const store = createStore(
    allReducers
    );


reactDom.render(
        <Provider store={store}>
                <Router>
                    <App />
                </Router>
        </Provider>,
        document.getElementById('app'));

