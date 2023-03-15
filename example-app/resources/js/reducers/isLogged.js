import Cookies from 'js-cookie';

const loggedReducer = (state=(parseInt(Cookies.get('isLogged')) ? 1 : 0) , action) => {

    switch(action.type){

        case 'login' :
            return action.bool;
        default :
            return state;
    }

}


export default loggedReducer;

