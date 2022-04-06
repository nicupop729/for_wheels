import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getCars } from '../../redux/cars/car';
import { getRental } from '../../redux/myReservations/myReservations';

const MyReservations = () => {
  const dispatch = useDispatch();
  const { rentals } = useSelector((state) => state.myRentalsReducer);
  const cars = useSelector((state) => state.carsReducer);

  useEffect(() => {
    dispatch(getCars());
  }, []);

  useEffect(() => {
    dispatch(getRental());
  }, []);

  const convertDate = (date) => new Date(date).toLocaleString('en-US');

  return (
    <div className="m-2">
      <p className="text-right mb-2">
        Cars rented:
        {rentals.length}
      </p>
      <ul>
        {rentals.map((rental) => (
          <li key={uuidv4()}>
            <div className="mb-2">
              <p>
                Car model:
                {cars.find((car) => car.id === rental.car_id).model}
              </p>
              <img
                src={cars.find((car) => car.id === rental.car_id).img_url}
                alt=""
              />
              <p>
                Pick up date:
                {convertDate(rental.start_date)}
              </p>
              <p>
                Drop off date:
                {convertDate(rental.end_date)}
              </p>
              <p>
                Total price:
                {rental.price}
              </p>
              <button
                className="p-2 rounded bg-red-500 text-white"
                type="submit"
              >
                Cancel reservation
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReservations;
