import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { UserAction } from './types';
import { getUserInfo, getUsersInfo, postUserInfo } from '../../api/user';
import { getUserInfoAsync, getUsersInfoAsync, postUserInfoAsync } from './actions';

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