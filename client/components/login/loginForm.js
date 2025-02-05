import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ServerURL } from 'config/config';
import useInput from 'hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequstAction } from 'reducers/user';

import styled from 'styled-components';
import styles from './login.module.scss';
import { useAuth } from '../auth/provider';
import onCallbackUserLogin from '../../utils/userLogin';

const Error = styled.div`
  width: 100%;
  color: red;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  padding-left: 0.2rem;
  font-size: 0.9rem;
  text-align: left;
`;

const LoginForm = ({ onModalClose }) => {
  const dispatch = useDispatch();
  const setLogin = useAuth();

  const { user, loginDone, loginError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [keepLoggedIn, onChangeKeepLoggedIn] = useInput('');
  const [loginInputError, setLoginInputError] = useState(false);
  const [attemptLoginError, setAttemptLoginError] = useState(false);

  useEffect(() => {
    if (loginError) {
      setAttemptLoginError(true);
    }
  }, [loginError, setAttemptLoginError]);

  useEffect(() => {
    if (loginDone) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (onModalClose) onModalClose();
    }
  }, [user]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (email === '' || password === '') return setLoginInputError(true);
      dispatch(loginRequstAction({ email, password }));
    },
    [email, password, setLoginInputError],
  );

  const onKakaoTalkLogin = useCallback((e) => {
    e.preventDefault();
    onCallbackUserLogin({ snsName: 'kakao' });
  }, []);

  return (
    <>
      <form className={styles.loginForm} onSubmit={onSubmit}>
        <input
          type='email'
          name='user-email'
          value={email}
          onChange={onChangeEmail}
          placeholder='이메일'
        />
        <input
          type='password'
          name='user-password'
          value={password}
          onChange={onChangePassword}
          placeholder='비밀번호'
        />
        {loginInputError && (
          <Error>이메일 또는 비밀번호가 입력되지 않았습니다.</Error>
        )}
        {attemptLoginError && (
          <Error>가입되지 않은 아이디이거나 잘못된 비밀번호 입니다.</Error>
        )}
        <div className={styles.loginInfoSet}>
          <div className={styles.loginKeep}>
            <input
              id='keepLoggedIn'
              type='checkbox'
              value={keepLoggedIn}
              onChange={onChangeKeepLoggedIn}
            />
            <label htmlFor='keepLoggedIn'>로그인 유지하기</label>
          </div>
          <Link href='/profile/search'>
            <div>아이디/비밀번호 찾기</div>
          </Link>
        </div>

        <div className={styles.loginButtonList}>
          <button htmltype='submit'>에브리쉐어 로그인</button>
          <button onClick={onKakaoTalkLogin}>카카오 로그인</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
