import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import carsReducer from './cars/car';
import myRentalsReducer from './myReservations/myReservations';
import reservationsReducer from './reservations/reservation';

const reducer = combineReducers({
  carsReducer,
  myRentalsReducer,
  reservationsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
