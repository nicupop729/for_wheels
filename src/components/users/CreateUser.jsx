/* eslint-disable react/prop-types */
import { useState } from 'react';
import baseUrl from '../../redux/apiServices';

const CreateUser = ({ onSetLogin, onSetUserId }) => {
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [input, setInput] = useState('');

  const setStates = (data) => {
    if (data.status === 'OK') {
      setSuccess(data.message);
      setErrors(null);
      setInput('');
    } else {
      setErrors(data.errors);
      setSuccess(null);
    }
  };

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
      setStates(data);
      if (errors === null) {
        const response = await fetch(`${baseUrl}/users/log_in`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: userName }),
        });
        const data = await response.json();
        onSetLogin(true);
        onSetUserId(data.data[0].id);
      }
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const setCreateUserHandler = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const { value } = e.target;
      await fetchPostUser(value);
    }
  };

  return (
    <>
      <h4>New user? Please register here</h4>
      {success && (
        <p className="text-sm text-green-800 font-medium">{success}</p>
      )}
      {errors && <p className="text-sm text-red-800 font-medium">{errors}</p>}
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

export default CreateUser;
