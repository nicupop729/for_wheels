import carsReducer from '../redux/cars/car';

describe('Testing cars actions:', () => {
  test('should return the initial state', () => {
    expect(carsReducer(undefined, {})).toEqual([]);
  });
});
