import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaRegWindowClose } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen ? (
        <button
          className="fixed  z-30 flex items-center cursor-pointer left-10 top-6"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            onClick={() => setIsOpen(!isOpen)}
            fill="#2563eb"
            viewBox="0 0 100 80"
            width="40"
            height="40"
          >
            <rect width="100" height="10" />
            <rect y="30" width="100" height="10" />
            <rect y="60" width="100" height="10" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          className="text-xl text-white fixed top-4 left-4 z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaRegWindowClose />
        </button>
      )}
      <div
        className={`top-0 left-0 w-[25vw] bg-blue-600  p-10 text-white fixed h-full ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ease-in-out duration-300`}
      >
        <h2 className="mt-20 text-4xl font-semibold text-white">Navigation</h2>

        <nav>
          <ul>
            <li>
              <NavLink to="/">Cars</NavLink>
            </li>
            <li>
              <NavLink to="/reserve">Reserve</NavLink>
            </li>
            <li>
              <NavLink to="/my_reservations">My Reservations</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
