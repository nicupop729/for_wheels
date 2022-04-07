import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import carsReducer from './cars/car';
import myRentalsReducer from './myReservations/myReservations';
import reservationsReducer from './reservations/reservation';
import usersReducer from './users/users';

const reducer = combineReducers({
  carsReducer,
  myRentalsReducer,
  reservationsReducer,
  usersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
