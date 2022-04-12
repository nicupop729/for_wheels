import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ShowCar = () => {
  const car = useLocation();
  const {
    model,
    price,
  } = car.state.car;
  const ImgUrl = car.state.car.img_url;
  return (
    <div className="p-8 relative">
      <div className="xl:flex relative mb-12 xl:mb-0">
        <div className="relative h-0 pb-2/5 flex-1 xl:mb-8">
          <img src={ImgUrl} alt={`This is a${{ model }}`} className="absolute inset-0 w-full h-full rounded-lg object-cover xl:pb-20 lg:pb-10 px-10 z-0" />
        </div>
        <div className="text-right flex-grow-0 px-5">
          <span className="text-3xl text-right font-bold">{model}</span>
          <p className="mb-10 text-xs font-bold"> - $350 deposit upon any for wheels rental</p>
          <div>
            <div className="bg-gray-200 flex justify-between px-4 py-3">
              <span>Finance fee</span>
              <span>$99</span>
            </div>
            <div className="bg-white flex justify-between px-4 py-3">
              <span>Option to purchase fee</span>
              <span>$179</span>
            </div>
            <div className="bg-gray-200 flex justify-between px-4 py-3">
              <span>Total amount payable</span>
              <span className="font-bold">
                $
                {price * 7 + 179 + 99}
              </span>
            </div>
            <div className="bg-white flex justify-between px-4 py-3 mb-2">
              <span>Duration</span>
              <span>7 Days</span>
            </div>
            <p className="mb-6 text-left px-4 text-lg">
              <span className="font-bold">5.9% APR </span>
              Representative
            </p>
            <div>
              <Link to="/" className="text-xs font-bold text-right hover:scale-105 transition duration-700 block mb-8">DISCOVER MORE MODELS</Link>
              <Link to="/reserve" state={car.state} className="block text-center max-w-sm m-auto rounded-full py-3 bg-green-400 text-gray-700 font-bold hover:text-white transition duration-600">RESERVE</Link>
            </div>
          </div>
        </div>
      </div>
      <Link to={car.state.path.previous} className="absolute left-0 text-center z-0 rounded-tr-3xl rounded-br-3xl py-3 pr-10 pl-6 bg-green-400 mx-12 text-gray-700 font-bold hover:text-white transition duration-600">GO BACK</Link>
    </div>
  );
};

export default ShowCar;
