import axios from 'axios';

const GET_CARS_SUCCESS = 'for_wheels/cars/GET_CARS_SUCCESS';
const initialState = [];
const baseUrl = 'http://127.0.0.1:8000';

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
