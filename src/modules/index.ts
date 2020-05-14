import { combineReducers } from 'redux';
import user from './user';
import analytics from './analytics';
import repository from './repositories';
import challenge from './challenges';

const rootReducer = combineReducers({
    user,
    analytics,
    repository,
    challenge,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;