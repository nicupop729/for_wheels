import axios from 'axios';
import baseUrl from '../apiServices';

const POST_RESERVATION_SUCCESS = 'for_wheels/reservations/POST_RESERVATION_SUCCESS';
const initialState = [];

export const postReservation = (obj) => (dispatch) => axios.post(`${baseUrl}/users/${obj.user_id}/rentals`, {
  start_date: obj.start_date,
  end_date: obj.end_date,
  car_id: obj.car_id,
  user_id: obj.user_id,
  price: obj.price,
}).then(
  (response) => {
    const messages = [];
    messages.push({
      message: response.data.message,
    });
    dispatch({ type: POST_RESERVATION_SUCCESS, messages });
  },
);

const reservationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_RESERVATION_SUCCESS:
      return [
        ...action.messages,
      ];
    default:
      return state;
  }
};

export default reservationsReducer;
