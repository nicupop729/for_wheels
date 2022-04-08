/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getCars } from '../../redux/cars/car';
import {
  deleteRental,
  getRental,
} from '../../redux/myReservations/myReservations';
import DeleteNotification from '../notifications/DeleteNotification';
import BigSpinner from '../spinners/BigSpinner';
import SmallSpinner from '../spinners/SmallSpinner';

const MyReservations = ({ loggedIn }) => {
  const dispatch = useDispatch();
  const { isLoading, rentals, message } = useSelector(
    (state) => state.myRentalsReducer,
  );
  const cars = useSelector((state) => state.carsReducer);

  const findCar = (cars, rental) => {
    const car = cars.find((car) => car.id === rental.car_id);
    return car;
  };

  useEffect(() => {
    dispatch(getCars());
  }, []);

  useEffect(() => {
    dispatch(getRental());
  }, []);

  const convertDate = (date) => new Date(date).toLocaleString('en-US');

  return (
    <>
      {loggedIn ? (
        <div className="m-2">
          {message !== null && <DeleteNotification message={message} />}
          <div className="text-right mb-2">
            Cars rented:
            {isLoading ? <SmallSpinner /> : rentals.length}
          </div>
          <ul>
            {isLoading ? (
              <BigSpinner />
            ) : (
              rentals.map((rental) => (
                <li key={uuidv4()}>
                  <div className="mb-2">
                    <p>
                      Car model:
                      {findCar(cars, rental).model}
                    </p>
                    <img src={findCar(cars, rental).img_url} alt="" />
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
                      onClick={() => {
                        dispatch(deleteRental(rental.id));
                      }}
                    >
                      Cancel reservation
                    </button>
                    <Link
                      to="/car"
                      state={findCar(cars, rental)}
                      className="border-solid border-2 border-dark p-2 bg-green-200"
                    >
                      Show car details
                    </Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </>
  );
};

export default MyReservations;
