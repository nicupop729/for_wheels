import baseUrl from '../apiServices';

const GET_RENTALS_REQUEST = 'GET_RENTAL_REQUEST';
const GET_RENTALS_SUCCESS = 'GET_RENTAL_SUCCESS';
const GET_RENTALS_FAILURE = 'GET_RENTAL_FAILURE';

// const RESERVE_CAR = 'RESERVE_CAR';
// const CANCEL_RESERVATION = 'CANCEL_RESERVATION';

export const getRental = () => (dispatch) => {
  dispatch({ type: GET_RENTALS_REQUEST });
  const fetchRental = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/12/rentals`);
      const data = await response.json();
      dispatch({ type: GET_RENTALS_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({ type: GET_RENTALS_FAILURE, payload: error.message });
    }
  };
  fetchRental();
};

const initialState = {
  isLoading: false,
  rentals: [],
  error: null,
};

const myRentalsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RENTALS_REQUEST:
      return { ...state, isLoading: true };
    case GET_RENTALS_SUCCESS:
      return { ...state, isLoading: false, rentals: payload };
    case GET_RENTALS_FAILURE:
      return { ...state, isLoading: false, error: payload };
    default:
      return state;
  }
};

export default myRentalsReducer;
