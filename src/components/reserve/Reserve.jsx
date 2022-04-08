/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { postReservation } from '../../redux/reservations/reservation';
import 'react-notifications/lib/notifications.css';

const Reserve = ({ loggedIn }) => {
  const car = useLocation();
  const dispatch = useDispatch();
  const {
    id,
    description,
    model,
    price,
  } = car.state;
  const ImgUrl = car.state.img_url;
  const obj = {
    start_date: '',
    end_date: '',
    car_id: id,
    user_id: 1,
    price,
  };
  const getStartDate = () => {
    obj.start_date = document.getElementById('StartDate').value;
  };
  const getEndDate = () => {
    obj.end_date = document.getElementById('EndDate').value;
  };
  const getStartHour = (event) => {
    if (obj.start_date === '') {
      alert('Select start date first!');
    } else {
      obj.start_date += ' ';
      obj.start_date += event.target.value;
    }
  };
  const getEndHour = (event) => {
    if (obj.end_date === '') {
      alert('Select end date first!');
    } else {
      obj.end_date += ' ';
      obj.end_date += event.target.value;
    }
  };
  const sendReservation = (e) => {
    e.preventDefault();
    if (obj.start_date === '' || obj.end_date === '' || document.getElementById('StartHour').value === '' || document.getElementById('EndHour').value === '') {
      NotificationManager.error('Please check date and time!', 'Somethiung went wrong!');
    } else {
      dispatch(postReservation(obj));
      NotificationManager.success('Redirecting you to your reservations.', 'Reservation Created!');
      document.getElementById('StartHour').value = '';
      document.getElementById('EndHour').value = '';
      document.getElementById('StartDate').value = '';
      document.getElementById('EndDate').value = '';
      setTimeout(() => {
        window.location.replace('/my_reservations');
      }, 3000);
    }
  };
  return (
    <>
      {loggedIn ? (
        <div className="flex flex-col p-8 inline-block shadow-lg mb-4 mx-3">
          <NotificationContainer />
          <img src={ImgUrl} alt={`This is a${{ model }}`} />
          <span className="text-5xl mt-2">{model}</span>
          <span className="text-sm my-2">{description}</span>
          <form className="flex flex-col" onSubmit={sendReservation}>
            <span className="text-2xl mb-2">
              Price:
              {price}
              {' '}
              USD
            </span>
            <label htmlFor="StartDate" className="mb-5">
              Start Date
              <input id="StartDate" type="date" onChange={getStartDate} />
              <input id="StartHour" type="time" onChange={getStartHour} />
            </label>
            <label htmlFor="EndDate" className="mb-5">
              End Date
              <input id="EndDate" type="date" onChange={getEndDate} />
              <input id="EndHour" type="time" onChange={getEndHour} />
            </label>
            <button
              type="submit"
              className="border-solid border-2 border-dark p-6 bg-green-300 mb-2"
            >
              RESERVE
            </button>
            <Link
              to="/car"
              className="border-solid border-2 border-dark p-6 bg-green-100"
              state={car.state}
            >
              GO BACK
            </Link>
          </form>
        </div>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </>
  );
};

export default Reserve;
