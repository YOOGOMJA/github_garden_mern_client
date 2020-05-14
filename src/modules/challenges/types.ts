import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { AllChallengesResponse, ChallengesByUserResponse, LatestChallengeResponse } from '../../api/challenge';

export type ChallengeAction = ActionType<typeof actions>;

export type ChallengeState = {
    all_challenges: {
        loading: boolean,
        error : Error | null,
        data : AllChallengesResponse | null,
    },
    challenges_by_user:{
        loading: boolean,
        error: Error | null,
        data: ChallengesByUserResponse | null,
    },
    latest_challenge:  {
        loading: boolean,
        error: Error | null,
        data: LatestChallengeResponse | null,
    }
};
