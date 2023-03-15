
const Account = (state={} , action) => {

    switch(action.type){

        case 'infos' :
            return action.bool;
        default :
            return state;
    }

}


export default Account;

