import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { Summary, AllAttendances, Languages } from '../../api/analytics';

export type AnalyticsAction = ActionType<typeof actions>;

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
    },
    languages: {
        loading: boolean,
        error: Error | null,
        data : Languages | null,
    }
}