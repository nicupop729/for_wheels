import reservationsReducer from '../redux/reservations/reservation';

describe('Testing reservations actions:', () => {
  test('should return the initial state', () => {
    expect(reservationsReducer(undefined, {})).toEqual([]);
  });
});
