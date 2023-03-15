import loggedReducer from './isLogged.js';
import account from './account.js';

import { combineReducers } from 'redux';


const allReducers = combineReducers({

    isLogged: loggedReducer,
    account: account
 

})

export default allReducers;