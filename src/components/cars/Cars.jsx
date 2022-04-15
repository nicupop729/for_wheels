import React from 'react';
import { useSelector } from 'react-redux';
import Car from './Car';

const Cars = () => {
  const cars = useSelector((state) => state.carsReducer);
  return (
    <div className="grid md:grid-cols-2 gap-10">
      {cars.map((obj) => (
        <Car car={obj} key={obj.id} />
      ))}
    </div>
  );
};

export default Cars;
