import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Cars from './components/cars/Cars';
import Reserve from './components/reserve/Reserve';
import MyReservations from './components/my_reservations/MyReservations';
import ShowCar from './components/cars/ShowCar';
import { getCars } from './redux/cars/car';
import Login from './components/users/Login';

const App = () => {
  const dataFromLocal = JSON.parse(localStorage.getItem('currentUser'));

  const [loggedIn, setLoggedIn] = useState(
    dataFromLocal ? dataFromLocal.loggedIn : false,
  );
  const [userId, setUserId] = useState(
    dataFromLocal ? dataFromLocal.userId : null,
  );

  const [userName, setUserName] = useState(dataFromLocal ? dataFromLocal.userName : '');

  localStorage.setItem('currentUser', JSON.stringify({ loggedIn, userId, userName }));

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

  const handleUserName = (name) => {
    setUserName(name);
  };

  return (
    <div className="mx-auto mt-8">
      <Sidebar
        onSetLogin={handleLogin}
        onSetUserId={handleUser}
        onSetUserName={handleUserName}
        loggedIn={loggedIn}
        userName={userName}
      />
      <main className="text-sm text-center">
        <Routes>
          <Route path="/" element={<Cars />} />
          <Route
            path="/login"
            element={(
              <Login
                onSetLogin={handleLogin}
                onSetUserId={handleUser}
                onSetUserName={handleUserName}
                loggedIn={loggedIn}
              />
            )}
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
