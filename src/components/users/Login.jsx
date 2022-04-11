import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { getUsers } from '../../redux/users/users';
import CreateUser from './CreateUser';

const Login = ({ onSetLogin, onSetUserId }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.usersReducer);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [existingUser, setExistingUser] = useState({ status: '' });

  useEffect(() => {
    if (existingUser.status === 'OK') {
      onSetLogin(true);
      onSetUserId(existingUser.id);
    }
  }, [existingUser]);

  const setExistingUserHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { value } = e.target;
      const user = users.find((user) => user.name === value);
      setExistingUser(
        user !== undefined
          ? { ...user, status }
          : { status: 404 },
      );
      if (user !== undefined) {
        NotificationManager.success('User account found');
        setTimeout(() => navigate('/'), 2000);
      } else {
        NotificationManager.error('User not found, Please Register');
      }
    }
  };

  return (
    <div>
      <h1>Welcome to For Wheels</h1>
      <h4>Already a user?</h4>
      <NotificationContainer />
      <form>
        <input
          id="existing_user_input"
          type="text"
          placeholder="Enter your user account"
          onKeyPress={setExistingUserHandler}
        />
      </form>
      <CreateUser onSetLogin={onSetLogin} onSetUserId={onSetUserId} />
    </div>
  );
};

Login.propTypes = {
  onSetLogin: PropTypes.func.isRequired,
  onSetUserId: PropTypes.func.isRequired,
};

export default Login;
