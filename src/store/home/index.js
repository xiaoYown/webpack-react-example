import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as user from './user/reducer';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({ ...user }), // reducer 合并
  applyMiddleware(thunk)
);

export default store;
