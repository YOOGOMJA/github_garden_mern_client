import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { RepositoriesByUserResponse } from '../../api/repo';

export type RepositoryAction = ActionType<typeof actions>;

export type RepositoryState = {
    repos_by_user: {
        loading: boolean,
        error : Error | null,
        data : RepositoriesByUserResponse | null,
    }
};


