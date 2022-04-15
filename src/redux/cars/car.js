import axios from 'axios';
import baseUrl from '../apiServices';

const GET_CARS_SUCCESS = 'for_wheels/cars/GET_CARS_SUCCESS';
const initialState = [];

export const getCars = () => (dispatch) => axios.get(`${baseUrl}/cars`).then(
  (response) => {
    const cars = response.data;
    dispatch({ type: GET_CARS_SUCCESS, cars });
  },
);

const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARS_SUCCESS:
      return [
        ...action.cars,
      ];
    default:
      return state;
  }
};

export default carsReducer;
