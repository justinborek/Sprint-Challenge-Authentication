import axios from 'axios';

export const ADD_USER = 'ADD_USER';
export const VERIFY_USER = 'VERIFY_USER';
export const GET_JOKES = 'GET_JOKES';

export const addUser = (username, password, confirmPassword, history) => {
  return dispatch => {
    if (password !== confirmPassword) {
      dispatch(authError('Passwords do not match'));
      return;
    }
    axios
      .post('http://localhost:5000/api/users', { username, password })
      .then(() => {
        dispatch({
          type: ADD_USER
        });
        history.pushState('/signin');
      })
      .catch(() => {
        dispatchEvent(authError('Failed to register user'));
      });
  };
};

export const verifyUser = (username, password, history) => {
  return dispatch => {
    axios
      .post('http://localhost:5000/api/login', { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({
          type: VERIFY_USER
        });
        history.push('/jokes');
      })
      .catch(() => {
        dispatch(authError('Incorrect username/password combo'));
      });
  };
};

export const getJokes = () => {
  return dispatch => {
    axios
      .get('http://localhost:5000/api/jokes', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(response => {
        dispatch({
          type: GET_JOKES,
          payload: response.data
        });
      })
      .catch(() => {
        dispatch(authError('Failed to get jokes'));
      })
  }
};