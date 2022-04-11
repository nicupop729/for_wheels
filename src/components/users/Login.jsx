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
    <div className="h-screen mt-16 bg-gray-400">
      <div className="bg-gray-400 max-h-screen flex flex-col pt-16">
        <NotificationContainer />
        {loggedIn ? (
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">
                Welcome to For Wheels
              </h1>
              <p className="mb-4">You are logged in!</p>
              <NavLink
                to="/"
                onClick={logOutHandler}
                className="p-2 rounded bg-red-500 text-white"
              >
                Logout
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">
                Welcome to For Wheels
              </h1>
              <h4 className="mb-8 text-1xl text-center">Already a user?</h4>
              <form>
                <input
                  id="existing_user_input"
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  placeholder="Write your user account and press enter"
                  onKeyPress={setExistingUserHandler}
                />
              </form>
            </div>
            <CreateUser
              onSetLogin={onSetLogin}
              onSetUserId={onSetUserId}
              onSetUserName={onSetUserName}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Login.propTypes = {
  onSetLogin: PropTypes.func.isRequired,
  onSetUserId: PropTypes.func.isRequired,
  onSetUserName: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
