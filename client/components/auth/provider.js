import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authAPI from 'lib/api/auth';
import storage from 'lib/storage';
import USER from 'actions/userAction';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loginState, setLoginState] = useState(false);
  const dispatch = useDispatch();

  const setLogin = (bool) => {
    setLoginState(bool);
  };

  return (
    <AuthContext.Provider value={{ setLogin }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider as default, useAuth };
