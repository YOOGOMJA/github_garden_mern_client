import { combineReducers } from 'redux';
import user from './user';
import analytics from './analytics';

const rootReducer = combineReducers({
    user,
    analytics,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;