import { createReducer } from "typesafe-actions";
import { UserState, UserAction } from "./types";
import {
    GET_USER_INFO,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_ERROR,
    GET_USERS_INFO,
    GET_USERS_INFO_SUCCESS,
    GET_USERS_INFO_ERROR,
    POST_USER_INFO,
    POST_USER_INFO_SUCCESS,
    POST_USER_INFO_ERROR,
    CLEAR_POST_USER_INFO,
    CLEAR_USER_INFO,
    CLEAR_USERS_INFO,
    
    GET_USERS_SEARCH,
    GET_USERS_SEARCH_SUCCESS,
    GET_USERS_SEARCH_ERROR,
    CLEAR_USERS_SEARCH,

    GET_USERS_PARTICIPATED_LATEST_CHALLENGE_ERROR,
    GET_USERS_PARTICIPATED_LATEST_CHALLENGE_SUCCESS,
    GET_USERS_PARTICIPATED_LATEST_CHALLENGE,
    CLEAR_USERS_PARTICIPATED_LATEST_CHALLENGE,
} from "./actions";

const initialState: UserState = {
    user: {
        loading: false,
        error: null,
        data: null,
    },
    users: {
        loading: false,
        error: null,
        data: null,
    },
    post_user: {
        loading: false,
        error: null,
        data: null,
    },
    searched_users:{
        loading: false,
        error: null,
        data: null,
    },
    users_participated_latest_challenge:{
        loading: false,
        error : null,
        data : null,
    }
};

const user = createReducer<UserState, UserAction>(initialState, {
    [GET_USER_INFO]: (state) => ({
        ...state,
        user: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USER_INFO_SUCCESS]: (state, action) => ({
        ...state,
        user: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USER_INFO_ERROR]: (state, action) => ({
        ...state,
        user: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USER_INFO]: (state: any) => ({
        ...state,
        user: {...initialState.user},
    }),
    // 모든 사용자 정보
    [GET_USERS_INFO]: (state) => ({
        ...state,
        user: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USERS_INFO_SUCCESS]: (state, action) => ({
        ...state,
        users: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USERS_INFO_ERROR]: (state, action) => ({
        ...state,
        users: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USERS_INFO]: (state:any)=>({
        ...state,
        users:{...initialState.users}
    }),
    // 사용자 정보 추가하기
    [POST_USER_INFO]: (state) => ({
        ...state,
        post_user: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [POST_USER_INFO_SUCCESS]: (state, action) => ({
        ...state,
        post_user: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [POST_USER_INFO_ERROR]: (state, action) => ({
        ...state,
        post_user: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_POST_USER_INFO]: (state:any)=>({
        ...state,
        post_user : {
            ...initialState.post_user
        }
    }),
    // 사용자 검색하기
    [GET_USERS_SEARCH]: (state) => ({
        ...state,
        searched_users: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USERS_SEARCH_SUCCESS]: (state, action) => ({
        ...state,
        searched_users: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USERS_SEARCH_ERROR]: (state, action) => ({
        ...state,
        searched_users: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USERS_SEARCH]: (state:any)=>({
        ...state,
        searched_users : {
            ...initialState.searched_users
        }
    }),
    // 최신 도전 일자에 참여중인 사용자 목록
    [GET_USERS_PARTICIPATED_LATEST_CHALLENGE]: (state) => ({
        ...state,
        users_participated_latest_challenge: {
            loading: true,
            error: null,
            data: null,
        },
    }),
    [GET_USERS_PARTICIPATED_LATEST_CHALLENGE_SUCCESS]: (state, action) => ({
        ...state,
        users_participated_latest_challenge: {
            loading: false,
            error: null,
            data: action.payload,
        },
    }),
    [GET_USERS_PARTICIPATED_LATEST_CHALLENGE_ERROR]: (state, action) => ({
        ...state,
        users_participated_latest_challenge: {
            loading: false,
            error: action.payload,
            data: null,
        },
    }),
    [CLEAR_USERS_PARTICIPATED_LATEST_CHALLENGE]: (state:any)=>({
        ...state,
        users_participated_latest_challenge : {
            ...initialState.searched_users
        }
    }),
});

export default user;
