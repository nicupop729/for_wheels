import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DeleteNotification = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);

  console.log(showAlert);

  return (
    <>
      {showAlert ? (
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 mx-6 bg-red-500">
          <span className="inline-block align-middle mr-8">{message}</span>
          <button
            type="button"
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

DeleteNotification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default DeleteNotification;
