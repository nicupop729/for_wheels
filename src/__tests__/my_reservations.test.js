import myRentalsReducer from '../redux/myReservations/myReservations';

describe('Testing my reservation actions:', () => {
  const initialState = {
    isLoading: false,
    rentals: [],
    error: null,
    message: null,
  };
  test('should return the initial state', () => {
    expect(myRentalsReducer(undefined, {})).toEqual(initialState);
  });
});
