import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import carsReducer from './cars/car';
import myRentalsReducer from './myReservations/myReservations';
// Import reducers here

const reducer = combineReducers({
  carsReducer,
  myRentalsReducer,
  // Add reducers here
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
