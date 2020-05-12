import { createReducer } from "typesafe-actions";
import { UserState, UserAction } from "./types";
import {
    GET_USER_INFO,
    GET_USER_INFO_ERROR,
    GET_USER_INFO_SUCCESS,
} from "./actions";

const initialState: UserState = {
    user: {
        loading: false,
        error: null,
        data: null,
    },
};

const user = createReducer<UserState, UserAction>(initialState, {
    [GET_USER_INFO]: state =>({
        ...state, 
        user:{
            loading: true,
            error : null,
            data: null,
        }
    }),
    [GET_USER_INFO_SUCCESS]: (state, action)=>({
        ...state, 
        user:{
            loading: false,
            error : null,
            data: action.payload
        }
    }),
    [GET_USER_INFO_ERROR]: (state,action)=>({
        ...state,
        user:{
            loading: false,
            error: action.payload,
            data: null,
        }
    })
});

export default user;