import apiCaller from '../apiCaller';
import handleSuccessfulLogin from './handleSuccessfulLogin';

export default function login(name) {
  return dispatch => {
    dispatch({ type: 'LOGIN', name });

    return apiCaller.login(name)
      .then(res => {
        dispatch(handleSuccessfulLogin(res.body));
      });
  }
}