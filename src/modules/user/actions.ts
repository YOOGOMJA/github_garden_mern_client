import { createAction, createAsyncAction } from 'typesafe-actions';
import { UserInfo } from '../../api/user';
import { AxiosError } from 'axios';

export const GET_USER_INFO = 'user/GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'user/GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'user/GET_USER_INFO_ERROR';

// 비동기 액션 생성
export const getUserInfoAsync = createAsyncAction(
    GET_USER_INFO,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR
)<undefined, UserInfo, AxiosError>();
