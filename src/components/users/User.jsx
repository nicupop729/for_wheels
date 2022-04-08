/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/users/users';

const User = ({ onSetLogin, onSetUserId }) => {
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

  const userSearchHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { value } = e.target;
      const user = users.find((user) => user.name === value);
      setExistingUser(
        user !== undefined
          ? { ...user, status, message: 'User account found' }
          : { status: 404, message: 'User not found, Please Register' },
      );
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
          onKeyPress={userSearchHandler}
        />
      </form>
    </div>
  );
};

export default User;
