import {GET_USER} from "../Actions/user_actions";

export default function (state={loading: true}, action) {
    switch(action.type) {
        case GET_USER:
            return {loading: false, ...action.payload};
        default:
            return state;
    }
}