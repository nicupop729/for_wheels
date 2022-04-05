import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Car = ({ car }) => {
  const {
    model,
    price,
  } = car;
  const ImgUrl = car.img_url;
  return (
    <div className="flex flex-col p-8 inline-block shadow-lg mb-4 mx-3">
      <img src={ImgUrl} alt={`This is a${{ model }}`} />
      <span>{model}</span>
      <span>
        Price:
        {price}
        {' '}
        USD
      </span>
      <Link to="/car" state={car} className="border-solid border-2 border-dark p-6 bg-green-200">SHOW MORE</Link>
    </div>
  );
};

Car.defaultProps = {
  car: {
    model: '',
    price: '',
    img_url: '',
  },
};

Car.propTypes = {
  car: PropTypes.shape({
    model: PropTypes.string,
    price: PropTypes.number,
    img_url: PropTypes.string,
  }),
};

export default Car;
