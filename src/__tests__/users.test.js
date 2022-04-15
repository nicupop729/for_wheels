import usersReducer from '../redux/users/users';

describe('Testing user actions:', () => {
  const initialState = {
    isLoading: false,
    users: [],
    message: null,
    error: null,
    status: null,
  };
  test('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });
});
