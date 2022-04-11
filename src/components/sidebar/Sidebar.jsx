import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaRegWindowClose } from 'react-icons/fa';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Sidebar = ({ onSetLogin, onSetUserId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebarHandler = () => {
    setIsOpen(!isOpen);
  };

  const logOutHandler = () => {
    toggleSidebarHandler();
    onSetLogin(false);
    onSetUserId(null);
    NotificationManager.success('Logged out successfully');
  };

  return (
    <>
      <NotificationContainer />
      {!isOpen ? (
        <button
          className="fixed z-30 flex items-center cursor-pointer top-4 left-4 space-y-2"
          type="button"
          onClick={() => toggleSidebarHandler()}
        >
          <svg
            onClick={() => toggleSidebarHandler()}
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
          className="text-xl text-white fixed top-4 left-4 z-10 "
          onClick={() => toggleSidebarHandler()}
        >
          <FaRegWindowClose />
        </button>
      )}
      <div
        className={`top-0 left-0 w-[70vw] bg-green-500  p-10 text-white fixed h-full ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ease-in-out duration-300`}
      >
        <nav className="mt-20 text-1xl font-medium text-white">
          <ul>
            <li className="mb-3">
              <NavLink to="/" onClick={() => toggleSidebarHandler()}>
                Cars
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink to="/" onClick={() => toggleSidebarHandler()}>
                Reserve
              </NavLink>
            </li>
            <li className="mb-3">
              <NavLink
                to="/my_reservations"
                onClick={() => toggleSidebarHandler()}
              >
                My Reservations
              </NavLink>
            </li>
          </ul>
          <ul className="flex justify-evenly mt-[70vh]">
            <NavLink to="/login" onClick={() => toggleSidebarHandler()}>
              Login
            </NavLink>
            <NavLink to="/" onClick={logOutHandler}>
              Logout
            </NavLink>
          </ul>
        </nav>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  onSetLogin: PropTypes.func.isRequired,
  onSetUserId: PropTypes.func.isRequired,
};

export default Sidebar;
