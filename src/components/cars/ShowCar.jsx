import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ShowCar = () => {
  const car = useLocation();
  const {
    description,
    model,
    price,
  } = car.state;
  const ImgUrl = car.state.img_url;
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
      <Link to="/reserve" className="border-solid border-2 border-dark p-6 bg-green-300 mb-2">RESERVE</Link>
      <Link to="/" className="border-solid border-2 border-dark p-6 bg-green-100">GO BACK</Link>
    </div>
  );
};

export default ShowCar;
