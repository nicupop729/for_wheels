import baseUrl from '../apiServices';

const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const getUsers = () => (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/users`);
      const data = await response.json();
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          message: data.message,
          users: data.data,
          status: data.status,
        },
      });
    } catch (error) {
      dispatch({ type: GET_USERS_FAILURE, payload: error.message });
    }
  };
  fetchUsers();
};

const initialState = {
  isLoading: false,
  users: [],
  message: null,
  error: null,
  status: null,
};

const usersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS_REQUEST:
      return { ...state, isLoading: true };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload.users,
        message: payload.message,
        status: payload.status,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
