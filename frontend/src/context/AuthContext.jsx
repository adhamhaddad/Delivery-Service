// ** React Imports
import { createContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../config';

// ** Defaults
const defaultProvider = {
  user:
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')),
  tokens: {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: Cookies.get('refreshToken')
  },
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
};
const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user);
  const [loading, setLoading] = useState(defaultProvider.loading);
  const [tokens, setTokens] = useState({
    accessToken: '',
    refreshToken: ''
  });

  // ** Hooks
  const history = useHistory();

  const handleLogin = (params, errorCallback) => {
    axios
      .post(`${API_URL}/auth/login`, params)
      .then(async (res) => {
        // Extract the access token from the response body
        // console.log(res)
        const { accessToken, refreshToken } = res.data.data;
        // Store the access token and refresh token in state
        setTokens({
          accessToken: accessToken,
          refreshToken: refreshToken.value
        });
        console.log('handleLogin Fired');
        // Store the user data in state
        setUser(res.data.data.user);

        // Set localStorage Items
        window.localStorage.setItem('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken.value, {
          expires: 30,
          secure: false,
          sameSite: 'strict'
        });
        window.localStorage.setItem('user', JSON.stringify(res.data.data.user));
        history.replace('/');
      })
      .catch((err) => {
        if (errorCallback) errorCallback(err);
      });
  };

  const handleLogout = () => {
    setUser(null);
    setTokens({
      accessToken: '',
      refreshToken: ''
    });
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('accessToken');
    Cookies.remove('refreshToken', {
      expires: 30,
      secure: false,
      sameSite: 'strict'
    });
    history.replace('/login');
  };

  const handleRegister = (params, errorCallback) => {
    axios
      .post(`${API_URL}/auth/register`, params)
      .then((res) => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch(err => (errorCallback ? errorCallback(err.response.data.errors) : null))

  };

  const values = {
    user,
    tokens,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
