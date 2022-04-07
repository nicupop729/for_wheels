import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Cars from './components/cars/Cars';
import Reserve from './components/reserve/Reserve';
import MyReservations from './components/my_reservations/MyReservations';
import ShowCar from './components/cars/ShowCar';
import './App.css';
import { getCars } from './redux/cars/car';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars());
  }, []);

  return (
    <div className="mx-auto mt-8">
      <Sidebar />
      <main className="text-4xl text-center">
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/my_reservations" element={<MyReservations />} />
          <Route path="/car" element={<ShowCar />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
