import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { getUsers } from '../../redux/users/users';
import CreateUser from './CreateUser';

const Login = ({
  onSetLogin,
  onSetUserId,
  onSetUserName,
  loggedIn,
}) => {
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
      onSetUserName(existingUser.name);
    }
  }, [existingUser]);

  const setExistingUserHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { value } = e.target;
      const user = users.find((user) => user.name === value);
      setExistingUser(
        user !== undefined ? { ...user, status } : { status: 404 },
      );
      if (user !== undefined) {
        NotificationManager.success('User account found');
        setTimeout(() => navigate('/'), 2000);
      } else {
        NotificationManager.error('User not found, Please Register');
      }
    }
  };

  const logOutHandler = () => {
    onSetLogin(false);
    onSetUserId(null);
    onSetUserName('');
    NotificationManager.success('Logged out successfully');
  };

  return (
    <>
      <NotificationContainer />
      {loggedIn ? (
        <>
          <h1>Welcome to For Wheels</h1>
          <p className="mb-4">You are logged in!</p>
          <NavLink
            to="/"
            onClick={logOutHandler}
            className="p-2 rounded bg-red-500 text-white"
          >
            Logout
          </NavLink>
        </>
      ) : (
        <div>
          <h1>Welcome to For Wheels</h1>
          <h4>Already a user?</h4>
          <form>
            <input
              id="existing_user_input"
              type="text"
              placeholder="Enter your user account"
              onKeyPress={setExistingUserHandler}
            />
          </form>
          <CreateUser
            onSetLogin={onSetLogin}
            onSetUserId={onSetUserId}
            onSetUserName={onSetUserName}
          />
        </div>
      )}
    </>
  );
};

Login.propTypes = {
  onSetLogin: PropTypes.func.isRequired,
  onSetUserId: PropTypes.func.isRequired,
  onSetUserName: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
