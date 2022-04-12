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
import logo from '../../assets/for_wheels_white_text.png';

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
    <div className="bg-gray-100 h-screen mt-16 md:mt-0 md:bg-white">
      <div className="max-h-screen flex flex-col pt-16">
        <NotificationContainer />
        {loggedIn ? (
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded text-black w-full shadow-md hover:shadow-xl transition duration-700 ">
              <h1 className="text-3xl text-center">
                Welcome to
                <br />
                For Wheels
              </h1>
              <img
                src={logo}
                alt="logo"
                className="h-48 rounded overflow-hidden mx-auto
                my-4"
              />
              <p className="mb-4">You are logged in!</p>
              <NavLink
                to="/"
                onClick={logOutHandler}
                className="p-2 rounded bg-red-500 text-white hover:bg-red-700 hover:shadow-xl transition duration-700"
              >
                Logout
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded text-black w-full shadow-md hover:shadow-xl transition duration-700 ">
              <h1 className="text-3xl text-center">
                Welcome to
                <br />
                For Wheels
              </h1>
              <img
                src={logo}
                alt="logo"
                className="h-48 rounded mx-auto
                my-4"
              />
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
