import { createReducer, action } from "typesafe-actions";
import { SummaryState, AnalyticsAction, AllAttendancesState, AnalyticsState } from "./types";
import {
    GET_SUMMARY,
    GET_SUMMARY_ERROR,
    GET_SUMMARY_SUCCESS,
    GET_ALL_ATTENDANCES,
    GET_ALL_ATTENDANCES_ERROR,
    GET_ALL_ATTENDANCES_SUCCESS,
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
});

export default analytics;