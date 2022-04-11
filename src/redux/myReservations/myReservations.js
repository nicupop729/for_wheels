import { NotificationManager } from 'react-notifications';
import baseUrl from '../apiServices';

const GET_RENTALS_REQUEST = 'GET_RENTAL_REQUEST';
const GET_RENTALS_SUCCESS = 'GET_RENTAL_SUCCESS';
const GET_RENTALS_FAILURE = 'GET_RENTAL_FAILURE';
const CANCEL_RESERVATION = 'CANCEL_RESERVATION';

export const getRental = (id) => (dispatch) => {
  dispatch({ type: GET_RENTALS_REQUEST });
  const fetchRental = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/${id}/rentals`);
      const data = await response.json();
      dispatch({ type: GET_RENTALS_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: GET_RENTALS_FAILURE, payload: error.message });
    }
  };
  fetchRental();
};

export const deleteRental = (rentalId) => (dispatch) => {
  const fetchDeleteRental = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/12/rentals/${rentalId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      dispatch({ type: CANCEL_RESERVATION, payload: { rentalId, data } });
      NotificationManager.error(data.message);
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };
  fetchDeleteRental();
};

const initialState = {
  isLoading: false,
  rentals: [],
  error: null,
  message: null,
};

const filterRent = (arr, payload) => arr.rentals.filter((r) => r.id !== payload.rentalId);

const myRentalsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RENTALS_REQUEST:
      return { ...state, isLoading: true };
    case GET_RENTALS_SUCCESS:
      return { ...state, isLoading: false, rentals: payload };
    case GET_RENTALS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case CANCEL_RESERVATION:
      return { ...state, rentals: filterRent(state, payload), message: payload.data.message };
    default:
      return state;
  }
};

export default myRentalsReducer;
