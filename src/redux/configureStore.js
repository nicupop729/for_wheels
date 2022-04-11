import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import carsReducer from './cars/car';
import myRentalsReducer from './myReservations/myReservations';
import reservationsReducer from './reservations/reservation';
import usersReducer from './users/users';
// import createUserReducer from './users/createUser';

const reducer = combineReducers({
  carsReducer,
  myRentalsReducer,
  reservationsReducer,
  usersReducer,
  // createUserReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
