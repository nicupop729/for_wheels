import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { postReservation } from '../../redux/reservations/reservation';

const Reserve = () => {
  const car = useLocation();
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
  const getStartDate = (event) => {
    obj.start_date = event.target.value;
  };
  const getEndDate = (event) => {
    obj.end_date = event.target.value;
  };
  return (
    <div className="flex flex-col p-8 inline-block shadow-lg mb-4 mx-3">
      <img src={ImgUrl} alt={`This is a${{ model }}`} />
      <span className="text-5xl mt-2">{model}</span>
      <span className="text-sm my-2">{description}</span>
      <span className="text-2xl mb-2">
        Price:
        {price}
        {' '}
        USD
      </span>
      <label htmlFor="StartDate">
        Start Date
        <input id="StartDate" type="date" onChange={getStartDate} />
      </label>
      <label htmlFor="EndDate">
        End Date
        <input id="EndDate" type="date" onChange={getEndDate} />
      </label>
      <button type="button" className="border-solid border-2 border-dark p-6 bg-green-300 mb-2" onClick={postReservation(obj)}>RESERVE</button>
      <Link to="/car" className="border-solid border-2 border-dark p-6 bg-green-100" state={car.state}>GO BACK</Link>
    </div>
  );
};

export default Reserve;
