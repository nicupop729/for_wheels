import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Car = ({ car }) => {
  const {
    model,
    description,
  } = car;
  const ImgUrl = car.img_url;
  return (
    <Link to="/car" state={car}>
      <div className="flex flex-col p-8 inline-block mb-6 mx-3 min-h-full shadow-md hover:shadow-xl transition duration-700">
        <img src={ImgUrl} alt={`This is a${{ model }}`} className="max-h-80" />
        <span className="text-2xl mt-3 mb-5 font-bold">{model}</span>
        <span className="text-xs text-gray-400">{description}</span>
      </div>
    </Link>
  );
};

Car.defaultProps = {
  car: {
    model: '',
    img_url: '',
    description: '',
  },
};

Car.propTypes = {
  car: PropTypes.shape({
    model: PropTypes.string,
    img_url: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default Car;
