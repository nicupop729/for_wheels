import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Cars from './components/cars/Cars';
import Reserve from './components/reserve/Reserve';
import MyReservations from './components/my_reservations/MyReservations';
import ShowCar from './components/cars/ShowCar';
import './App.css';
import { getCars } from './redux/cars/car';
import Login from './components/users/Login';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCars());
  }, []);

  const handleLogin = (login) => {
    setLoggedIn(login);
  };

  const handleUser = (user) => {
    setUserId(user);
  };

  return (
    <div className="mx-auto mt-8">
      <Sidebar onSetLogin={handleLogin} onSetUserId={handleUser} />
      <main className="text-sm text-center">
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route
            path="/login"
            element={
              <Login onSetLogin={handleLogin} onSetUserId={handleUser} />
            }
          />
          <Route
            path="/reserve"
            element={<Reserve loggedIn={loggedIn} userId={userId} />}
          />
          <Route
            path="/my_reservations"
            element={<MyReservations loggedIn={loggedIn} userId={userId} />}
          />
          <Route path="/car" element={<ShowCar loggedIn={loggedIn} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
