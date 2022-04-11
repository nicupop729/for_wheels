import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import baseUrl from '../../redux/apiServices';

const CreateUser = ({ onSetLogin, onSetUserId }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const fetchPostUser = async (userName) => {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName }),
      });
      const data = await response.json();
      if (data.status === 'OK') {
        const response = await fetch(`${baseUrl}/users/log_in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: userName }),
        });
        const res = await response.json();
        onSetLogin(true);
        onSetUserId(res.data[0].id);
        NotificationManager.success(data.message);
        setTimeout(() => navigate('/'), 2000);
      } else {
        NotificationManager.error(data.errors);
      }
    } catch (error) {
      NotificationManager.error(error.message);
    }
  };

  const setCreateUserHandler = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { value } = e.target;
      await fetchPostUser(value);
    }
  };

  const newLocal = ' ';
  return (
    <>
      <h4>New user? Please register here</h4>
      {newLocal}
      <NotificationContainer />
      <form>
        <input
          id="new_user_input"
          type="text"
          placeholder="Enter your new user account and press enter"
          onKeyPress={setCreateUserHandler}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </form>
    </>
  );
};

CreateUser.propTypes = {
  onSetLogin: PropTypes.func.isRequired,
  onSetUserId: PropTypes.func.isRequired,
};

export default CreateUser;
