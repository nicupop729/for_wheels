// import NotificationManager from 'react-notifications/lib/NotificationManager';
// import baseUrl from '../apiServices';

// const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
// const POST_USER_FAILURE = 'POST_USER_FAILURE';

// export const postUser = (user) => (dispatch) => {
//   const fetchPostUser = async (userName) => {
//     try {
//       const response = await fetch(`${baseUrl}/users`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: userName }),
//       });
//       const data = await response.json();
//       dispatch({
//         type: POST_USER_SUCCESS,
//         payload: { status: data.status, message: data.message },
//       });
//       console.log(data);
//       NotificationManager.success(data.message);
//     } catch (error) {
//       dispatch({ type: POST_USER_FAILURE, payload: error.message });
//       NotificationManager.error(error.message);
//     }
//   };
//   fetchPostUser(user);
// };

// const initialState = {
//   message: '',
//   status: null,
// };

// const createUserReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case POST_USER_SUCCESS:
//       return {
//         ...state,
//         message: payload.message,
//         status: payload.status,
//       };
//     case POST_USER_FAILURE:
//       return {
//         ...state,
//         message: payload,
//       };
//     default:
//       return state;
//   }
// };

// export default createUserReducer;
