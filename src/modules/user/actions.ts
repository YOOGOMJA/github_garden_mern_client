import { createAction, createAsyncAction } from 'typesafe-actions';
import GitFarmResponse from '../../api/interfaces/GitFarmResponse';
import { UserInfo,UsersInfo } from '../../api/user';
import { AxiosError } from 'axios';

export const GET_USER_INFO = 'user/GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'user/GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'user/GET_USER_INFO_ERROR';

export const GET_USERS_INFO = 'user/GET_USERS_INFO';
export const GET_USERS_INFO_SUCCESS = 'user/GET_USERS_INFO_SUCCESS';
export const GET_USERS_INFO_ERROR = 'user/GET_USERS_INFO_ERROR';

export const POST_USER_INFO = 'user/POST_USER_INFO';
export const POST_USER_INFO_SUCCESS = 'user/POST_USER_INFO_SUCCESS';
export const POST_USER_INFO_ERROR = 'user/POST_USER_INFO_ERROR';

// 비동기 액션 생성
export const getUserInfoAsync = createAsyncAction(
    GET_USER_INFO,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR
)<undefined, UserInfo, AxiosError>();

export const getUsersInfoAsync = createAsyncAction(
    GET_USERS_INFO,
    GET_USERS_INFO_SUCCESS,
    GET_USERS_INFO_ERROR
)<undefined, UsersInfo, AxiosError>();

export const postUserInfoAsync = createAsyncAction(
    POST_USER_INFO,
    POST_USER_INFO_SUCCESS,
    POST_USER_INFO_ERROR
)<undefined, GitFarmResponse ,AxiosError>();