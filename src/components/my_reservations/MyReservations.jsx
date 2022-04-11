import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NotificationContainer } from 'react-notifications';
import {
  getRental,
} from '../../redux/myReservations/myReservations';
import Reservations from './Reservations';
import BigSpinner from '../spinners/BigSpinner';
import SmallSpinner from '../spinners/SmallSpinner';
import { getUsers } from '../../redux/users/users';

const MyReservations = ({ loggedIn, userId }) => {
  const dispatch = useDispatch();
  const { isLoading, rentals } = useSelector(
    (state) => state.myRentalsReducer,
  );

  useEffect(() => {
    dispatch(getRental(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      {loggedIn ? (
        <div className="m-2">
          <NotificationContainer />
          <div className="text-right mb-2">
            Cars rented:
            {isLoading ? <SmallSpinner /> : rentals.length}
          </div>
          <ul>{isLoading ? <BigSpinner /> : <Reservations />}</ul>
        </div>
      ) : (
        <>
          <h1 className="mb-5">You are not logged in</h1>
          <Link
            to="/login"
            className="border-solid border-2 border-dark p-2 bg-green-200"
          >
            Login
          </Link>
        </>
      )}
    </>
  );
};

MyReservations.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.number,
};

MyReservations.defaultProps = {
  userId: null,
};

export default MyReservations;
