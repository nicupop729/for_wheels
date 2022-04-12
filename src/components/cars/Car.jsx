import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Car = ({ car }) => {
  const {
    model,
    description,
  } = car;
  const ImgUrl = car.img_url;
  const path = {
    previous: '/',
  };
  return (
    <Link to="/car" state={{ car, path }} className="mb-5">
      <div className="flex flex-col py-8 px-4 inline-block mx-3 min-h-full shadow-md hover:shadow-xl transition duration-700">
        <div className="relative h-0 pb-3/7 pt-1/4 flex-1 xl:mb-8">
          <img src={ImgUrl} alt={`This is a${{ model }}`} className="absolute inset-0 w-full h-full rounded-lg object-cover z-0" />
        </div>
        <span className="text-2xl mb-5 font-bold">{model}</span>
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
