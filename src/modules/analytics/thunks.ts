import { ThunkAction } from 'redux-thunk'
import { RootState } from '..';
import { AnalyticsAction} from './types';
import { getSummary, getAllAttendances } from '../../api/analytics';
import { getSummaryAsync, getAllAttendancesAsync } from './actions';

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