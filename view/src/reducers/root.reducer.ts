import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const rootReducer = combineReducers({
  router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;
