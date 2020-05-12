import { createAction, createAsyncAction } from 'typesafe-actions';
import { Summary, AllAttendances, Languages } from '../../api/analytics';
import { AxiosError } from 'axios';

export const GET_SUMMARY = 'analytics/GET_SUMMARY';
export const GET_SUMMARY_SUCCESS = 'analytics/GET_SUMMARY_SUCCESS';
export const GET_SUMMARY_ERROR = 'analytics/GET_SUMMARY_ERROR';

export const GET_ALL_ATTENDANCES = 'analytics/GET_ALL_ATTENDANCES';
export const GET_ALL_ATTENDANCES_SUCCESS = 'analytics/GET_ALL_ATTENDANCES_SUCCESS';
export const GET_ALL_ATTENDANCES_ERROR = 'analytics/GET_ALL_ATTENDANCES_ERROR';

export const GET_LANGUAGES_POPULARITY = 'analytics/GET_LANGUAGES_POPULARITY';
export const GET_LANGUAGES_POPULARITY_SUCCESS = 'analytics/GET_LANGUAGES_POPULARITY_SUCCESS';
export const GET_LANGUAGES_POPULARITY_ERROR = 'analytics/GET_LANGUAGES_POPULARITY_ERROR';

export const getSummaryAsync = createAsyncAction(
    GET_SUMMARY,
    GET_SUMMARY_SUCCESS,
    GET_SUMMARY_ERROR
)<undefined, Summary, AxiosError>();

export const getAllAttendancesAsync = createAsyncAction(
    GET_ALL_ATTENDANCES,
    GET_ALL_ATTENDANCES_SUCCESS,
    GET_ALL_ATTENDANCES_ERROR,
)<undefined, AllAttendances, AxiosError>();

export const getLanguagesPopularityAsync = createAsyncAction(
    GET_LANGUAGES_POPULARITY,
    GET_LANGUAGES_POPULARITY_SUCCESS,
    GET_LANGUAGES_POPULARITY_ERROR,
)<undefined, Languages, AxiosError>();
