import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { Summary, AllAttendances } from '../../api/analytics';

export type AnalyticsAction = ActionType<typeof actions>;
export type SummaryState = {
    summary : {
        loading: boolean,
        error : Error | null,
        data: Summary | null,
    }
}
export type AllAttendancesState = {
    all_attendances: {
        loading: boolean,
        error : Error | null,
        data : AllAttendances | null,
    }
}

export type AnalyticsState = {
    summary : {
        loading: boolean,
        error : Error | null,
        data: Summary | null,
    },
    all_attendances: {
        loading: boolean,
        error : Error | null,
        data : AllAttendances | null,
    }
}