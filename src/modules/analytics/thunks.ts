import { ThunkAction } from 'redux-thunk'
import { RootState } from '..';
import { AnalyticsAction} from './types';
import { getSummary, getAllAttendances, getLanguagesPopularity } from '../../api/analytics';
import { getSummaryAsync, getAllAttendancesAsync, getLanguagesPopularityAsync } from './actions';

export function getSummaryThunk():ThunkAction<void,RootState,null,AnalyticsAction>{
    return async dispatch=>{
        const {request, success, failure} = getSummaryAsync;
        dispatch(request());
        try{
            const summary = await getSummary();
            dispatch(success(summary));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function getAllAttendancesThunk():ThunkAction<void,RootState,null,AnalyticsAction>{
    return async dispatch=>{
        const {request, success, failure} = getAllAttendancesAsync;
        dispatch(request());
        try{
            const all_attendances = await getAllAttendances();
            dispatch(success(all_attendances));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}

export function getLanguagesPopularityThunk():ThunkAction<void, RootState, null, AnalyticsAction>{
    return async dispatch =>{
        const {request, success, failure} = getLanguagesPopularityAsync;
        dispatch(request);
        try{
            const response = await getLanguagesPopularity();
            dispatch(success(response));
        }
        catch(e){
            dispatch(failure(e));
        }
    }
}