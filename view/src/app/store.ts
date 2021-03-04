import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, history } from '../reducers/root.reducer';
import * as middleware from '../middleware';
import { routerMiddleware } from 'connected-react-router';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appliedMiddleware = [thunk, routerMiddleware(history), ...Object.values(middleware)];

const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...appliedMiddleware)));

export default store;
