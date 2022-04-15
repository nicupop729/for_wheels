import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { postReservation } from '../../redux/reservations/reservation';
import 'react-notifications/lib/notifications.css';

const Reserve = ({ loggedIn, userId }) => {
  const navigate = useNavigate();
  const car = useLocation();
  const dispatch = useDispatch();
  const {
    id,
    model,
    price,
  } = car.state;
  const ImgUrl = car.state.img_url;
  const obj = {
    start_date: '',
    end_date: '',
    car_id: id,
    user_id: userId,
    price: price * 7 + 179 + 99,
  };
  const getStartDate = () => {
    obj.start_date = document.getElementById('StartDate').value;
  };
  const getEndDate = () => {
    obj.end_date = document.getElementById('EndDate').value;
  };
  const compareDates = () => {
    const start = document.getElementById('StartDate').value;
    const end = document.getElementById('EndDate').value;
    if ((end.slice(0, 4) - start.slice(0, 4)) >= 0) {
      if ((end.slice(5, 7) - start.slice(5, 7)) >= 0) {
        if ((end.slice(8, 10) - start.slice(8, 10)) >= 0) {
          return true;
        }
      }
    }
    return false;
  };
  const checkDate = () => {
    const today = new Date().toISOString().slice(0, 10);
    const date = document.getElementById('StartDate').value;
    if ((date.slice(0, 4) - today.slice(0, 4)) >= 0) {
      if ((date.slice(5, 7) - today.slice(5, 7)) >= 0) {
        if ((date.slice(8, 10) - today.slice(8, 10)) >= 0) {
          if (compareDates()) {
            return true;
          }
        }
      }
    }
    return false;
  };
  const formatTime = () => {
    const start = document.getElementById('StartHour').value;
    const end = document.getElementById('EndHour').value;
    let newStart = '';
    let newEnd = '';
    if (start.slice(0, 2) > 12) {
      newStart += `${(start.slice(0, 2) - 12)}:${start.slice(3, 5)} PM`;
    } else {
      newStart += `${start} AM`;
    }
    if (end.slice(0, 2) > 12) {
      newEnd += `${(end.slice(0, 2) - 12)}:${end.slice(3, 5)} PM`;
    } else {
      newEnd += `${end} AM`;
    }
    obj.start_date += ` ${newStart}`;
    obj.end_date += ` ${newEnd}`;
  };
  const sendReservation = (e) => {
    e.preventDefault();
    if (checkDate()) {
      formatTime();
      dispatch(postReservation(obj));
      NotificationManager.success('Redirecting you to your reservations.', 'Reservation Created!');
      document.getElementById('StartHour').value = '';
      document.getElementById('EndHour').value = '';
      document.getElementById('StartDate').value = '';
      document.getElementById('EndDate').value = '';
      setTimeout(() => {
        navigate('/my_reservations');
      }, 3000);
    } else {
      NotificationManager.error('Please check date and time!', 'Something went wrong!');
    }
  };
  return (
    <>
      {loggedIn ? (
        <div className="p-8">
          <NotificationContainer />
          <div className="xl:flex relative mb-12 xl:mb-0">
            <div className="relative h-0 pb-2/5 flex-1 xl:mb-8">
              <img src={ImgUrl} alt={`This is a${{ model }}`} className="absolute inset-0 w-full h-full rounded-lg object-cover xl:pb-20 lg:pb-10 px-10 z-0" />
            </div>
            <div className="text-right flex-grow-0 px-5">
              <span className="text-3xl text-right font-bold">{model}</span>
              <p className="mb-10 text-xs font-bold"> - $350 deposit upon any for wheels rental</p>
              <div>
                <form className="flex flex-col w-100" onSubmit={sendReservation}>
                  <div className="bg-gray-200 flex justify-between px-4 py-3">
                    <span>Price</span>
                    <span className="font-bold">
                      $
                      {price * 7 + 179 + 99}
                    </span>
                  </div>
                  <label htmlFor="StartDate" className="bg-white flex justify-between px-4 py-3">
                    Start Date
                    <input id="StartDate" type="date" onChange={getStartDate} />
                    <input id="StartHour" type="time" />
                  </label>
                  <label htmlFor="EndDate" className="bg-gray-200 flex justify-between px-4 py-3">
                    End Date
                    <input id="EndDate" type="date" className="bg-gray-200" onChange={getEndDate} />
                    <input id="EndHour" type="time" className="bg-gray-200" />
                  </label>
                  <div>
                    <Link to="/" className="text-xs my-6 font-bold text-right hover:scale-105 transition duration-700 block mb-8">DISCOVER MORE MODELS</Link>
                    <button
                      type="submit"
                      className="block text-center max-w-sm px-20 sm:px-40 m-auto rounded-full py-3 bg-green-400 text-gray-700 font-bold hover:text-white transition duration-600"
                    >
                      RESERVE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Link to="/" className="absolute left-0 text-center z-0 rounded-tr-3xl rounded-br-3xl py-3 pr-10 pl-6 bg-green-400 mx-12 text-gray-700 font-bold hover:text-white transition duration-600">GO BACK</Link>
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

Reserve.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  userId: PropTypes.number,
};

Reserve.defaultProps = {
  userId: null,
};

export default Reserve;
