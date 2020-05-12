import { createReducer, action } from "typesafe-actions";
import { AnalyticsAction, AnalyticsState } from "./types";
import {
    GET_SUMMARY,
    GET_SUMMARY_ERROR,
    GET_SUMMARY_SUCCESS,
    GET_ALL_ATTENDANCES,
    GET_ALL_ATTENDANCES_ERROR,
    GET_ALL_ATTENDANCES_SUCCESS,
    GET_LANGUAGES_POPULARITY,
    GET_LANGUAGES_POPULARITY_SUCCESS,
    GET_LANGUAGES_POPULARITY_ERROR,
} from "./actions";

const intialState:AnalyticsState = {
    summary: {
        loading: false,
        error: null,
        data: null,
    },
    all_attendances:{
        loading: false,
        error: null,
        data: null,
    },
    languages: {
        loading: false,
        error : null,
        data: null,
    }
}

const analytics = createReducer<AnalyticsState, AnalyticsAction>(intialState, {
    [GET_SUMMARY]: state=>({
        ...state,
        summary: {
            loading:true,
            error:null,
            data:null,
        }
    }),
    [GET_SUMMARY_SUCCESS]:(state, action)=>({
        ...state,
        summary:{
            loading: false,
            error: null,
            data: action.payload
        }
    }),
    [GET_SUMMARY_ERROR]:(state, action)=>({
        ...state,
        summary:{
            loading: false,
            error: action.payload,
            data: null,
        }
    }),
    [GET_ALL_ATTENDANCES]:state=>({
        ...state,
        all_attendances:{
            loading:true,
            error:null,
            data:null,
        },
    }),
    [GET_ALL_ATTENDANCES_SUCCESS]:(state,action)=>({
        ...state, 
        all_attendances:{
            loading: false,
            error: null,
            data: action.payload
        }
    }),
    [GET_ALL_ATTENDANCES_ERROR]:(state, action)=>({
        ...state,
        all_attendances:{
            loading:false,
            error: action.payload,
            data: null,
        }
    }),
    // 언어 사용률 조회
    [GET_LANGUAGES_POPULARITY]:state=>({
        ...state,
        languages:{
            loading:true,
            error:null,
            data:null,
        },
    }),
    [GET_LANGUAGES_POPULARITY_SUCCESS]:(state,action)=>({
        ...state, 
        languages:{
            loading: false,
            error: null,
            data: action.payload
        }
    }),
    [GET_LANGUAGES_POPULARITY_ERROR]:(state, action)=>({
        ...state,
        languages:{
            loading:false,
            error: action.payload,
            data: null,
        }
    }),
});

export default analytics;