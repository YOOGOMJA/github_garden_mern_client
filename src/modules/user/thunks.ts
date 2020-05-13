import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { UserAction } from './types';
import { getUserInfo, getUsersInfo, postUserInfo } from '../../api/user';
import { getUserInfoAsync, getUsersInfoAsync, postUserInfoAsync, CLEAR_POST_USER_INFO, CLEAR_USER_INFO, CLEAR_USERS_INFO } from './actions';

export function getUserInfoThunk(user_name:string): ThunkAction<void, RootState, null, UserAction>{
    return async dispatch => {
        const { request, success, failure } = getUserInfoAsync;
        dispatch(request());
        try{
            const userInfo = await getUserInfo(user_name);
            dispatch(success(userInfo));
        }
        catch(e){
            dispatch(failure(e));
        }
    };
}

export function clearUserInfoThunk():ThunkAction<void, RootState, null, UserAction>{
    return dispatch=>{
        const { cancel } = getUserInfoAsync;
        dispatch(cancel());
    }
}

export function clearUsersInfoThunk():ThunkAction<void, RootState, null, UserAction>{
    return dispatch=>{
        const { cancel } = getUsersInfoAsync;
        dispatch(cancel());
    }
}

export function clearPostUserInfoThunk():ThunkAction<void, RootState, null, UserAction>{
    return dispatch=>{
        const { cancel } = postUserInfoAsync;
        dispatch(cancel());
    }
}

export function getUsersInfoThunk():ThunkAction<void, RootState, null, UserAction>{
    return async dispatch=>{
        const {request, success, failure} = getUsersInfoAsync;
        dispatch(request());
        try{
            const usersInfo = await getUsersInfo();
            dispatch(success(usersInfo));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function postUserInfoThunk(user_name: string): ThunkAction<void, RootState, null, UserAction>{
    return async dispatch=>{
        const {request, success, failure} = postUserInfoAsync;
        dispatch(request());
        try{
            const response = await postUserInfo(user_name);
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}