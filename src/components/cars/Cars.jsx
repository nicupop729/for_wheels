import React from 'react';
import { useSelector } from 'react-redux';
import Car from './Car';

const Cars = () => {
  const cars = useSelector((state) => state.carsReducer);
  return (
    <div>
      <div className="mt-16 mb-3 xl:my-12 xl:pt-6">
        <h1 className="text-5xl mb-2 font-bold text-green-800">FOR WHEELS</h1>
        <p className="text-base text-gray-400">Luxury Car Agency</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {cars.map((obj) => (
          <Car car={obj} key={obj.id} />
        ))}
      </div>
    </div>
  );
};

export default Cars;
