/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUsers } from '../../redux/users/users';
// import { postUser } from '../../redux/users/createUser';
import CreateUser from './CreateUser';

const User = ({ onSetLogin, onSetUserId }) => {
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
          ? { ...user, status, message: 'User account found' }
          : { status: 404, message: 'User not found, Please Register' },
      );
      if (user !== undefined) setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div>
      <h1>Welcome to For Wheels</h1>
      <h4>Already a user?</h4>
      {existingUser.status === 404 ? (
        <p>{existingUser.message}</p>
      ) : (
        <p>{existingUser.message}</p>
      )}
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

export default User;
