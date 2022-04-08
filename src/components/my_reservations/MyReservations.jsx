/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationContainer } from 'react-notifications';
import { getCars } from '../../redux/cars/car';
import {
  getRental,
} from '../../redux/myReservations/myReservations';
// import DeleteNotification from '../notifications/DeleteNotification';
import Reservations from './Reservations';
import BigSpinner from '../spinners/BigSpinner';
import SmallSpinner from '../spinners/SmallSpinner';

const MyReservations = ({ loggedIn, userId }) => {
  const dispatch = useDispatch();
  const { isLoading, rentals, message } = useSelector(
    (state) => state.myRentalsReducer,
  );

  useEffect(() => {
    dispatch(getCars());
  }, []);

  useEffect(() => {
    dispatch(getRental(userId));
  }, []);

  return (
    <>
      {loggedIn ? (
        <div className="m-2">
          {message !== null && <NotificationContainer />}
          <div className="text-right mb-2">
            Cars rented:
            {isLoading ? <SmallSpinner /> : rentals.length}
          </div>
          <ul>
            {isLoading ? (
              <BigSpinner />
            ) : (
              <Reservations />
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
