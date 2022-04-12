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
    <div className="px-10 mt-10">
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
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-20">
          <div className="bg-white px-6 py-8 rounded text-black w-full shadow-md hover:shadow-xl transition duration-700 ">
            <p className="mb-10">You are not logged in</p>
            <Link
              to="/login"
              className="block text-center max-w-sm m-auto rounded-full py-3 bg-green-400 text-gray-700 font-bold hover:text-white transition duration-600"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
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
