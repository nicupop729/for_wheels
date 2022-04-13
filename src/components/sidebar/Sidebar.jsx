import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaRegWindowClose } from 'react-icons/fa';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import logo from '../../assets/for_wheels_white_text.png';

const Sidebar = ({
  onSetLogin,
  onSetUserId,
  onSetUserName,
  loggedIn,
  userName,
}) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 720);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  const toggleSidebarHandler = () => {
    setIsOpen(!isOpen);
  };

  const logOutHandler = () => {
    handleResize();
    onSetLogin(false);
    onSetUserId(null);
    onSetUserName('');
    if (loggedIn) {
      NotificationManager.success('Logged out successfully');
    } else NotificationManager.error('You were not logged in');
  };

  const newLocal = ' ';

  return (
    <>
      <NotificationContainer />
      {!isOpen ? (
        <button
          className="fixed z-30 flex items-center cursor-pointer top-4 left-4 space-y-2 md:invisible"
          type="button"
          onClick={() => toggleSidebarHandler()}
        >
          <svg
            fill="rgb(34 197 94)"
            viewBox="0 0 100 80"
            width="30"
            height="30"
          >
            <rect width="100" height="10" />
            <rect y="30" width="100" height="10" />
            <rect y="60" width="100" height="10" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          className="text-xl text-green-600 fixed top-4 left-4 z-20 md:invisible"
          onClick={() => toggleSidebarHandler()}
        >
          <FaRegWindowClose />
        </button>
      )}
      <div
        className={`top-0 left-0 w-[70vw] bg-gray-200  p-10 text-green-600 fixed h-full z-10 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ease-in-out duration-300 md:w-[35vw] md:sticky md:h-[100vh] md:bg-white lg:w-[30vw] xl:w-[25vw]`}
      >
        <nav className="mt-20 text-1xl font-medium">
          <img
            src={logo}
            alt="logo"
            className="h-48 rounded overflow-hidden mx-auto
                mb-4"
          />
          <ul className="uppercase text-xl pt-10">
            <li className="mb-3">
              <NavLink to="/" onClick={() => handleResize()}>
                Cars
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink to="/" onClick={() => handleResize()}>
                Reserve
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink to="/my_reservations" onClick={() => handleResize()}>
                My Reservations
              </NavLink>
            </li>
          </ul>
          <div className="fixed rounded bottom-0 left-[2.5%] h-40 w-[95%] mb-5 bg-white mx-auto flex flex-col justify-evenly items-center md:bg-gray-100">
            {loggedIn ? (
              <>
                <h3>
                  Welcome
                  {newLocal}
                  {userName}
                </h3>
                <NavLink to="/" onClick={logOutHandler}>
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <h3>You are not signed in</h3>
                <NavLink to="/login" onClick={() => handleResize()}>
                  Login / Sign up
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  onSetLogin: PropTypes.func.isRequired,
  onSetUserId: PropTypes.func.isRequired,
  onSetUserName: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};

export default Sidebar;
