import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import authAPI from 'lib/api/auth';
import storage from 'lib/storage';
import USER from 'actions/userAction';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider as default, useAuth };
