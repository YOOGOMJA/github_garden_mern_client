import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { Summary, AllAttendances, Languages, PopularRepository, FeaturedRepository, AllAttendancesByDates } from '../../api/analytics';


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
    all_attendances_by_dates : {
        loading: boolean,
        error : Error | null,
        data : AllAttendancesByDates | null,
    },
    languages: {
        loading: boolean,
        error: Error | null,
        data : Languages | null,
    },
    featured_repo: {
        loading: boolean,
        error : Error | null,
        data : PopularRepository | null,
    },
    popular_repo: {
        loading: boolean,
        error : Error | null,
        data : FeaturedRepository | null,
    }
}