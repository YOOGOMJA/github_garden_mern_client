import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { UserAction } from './types';
import { getUserInfo } from '../../api/user';
import { getUserInfoAsync } from './actions';

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