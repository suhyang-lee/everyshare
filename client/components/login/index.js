import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './login.module.scss';
import LoginForm from 'components/login/loginForm';
import useMouseLock from 'hooks/useMouseLock';

const Login = ({ onModalOpen, onModalClose }) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  useMouseLock();

  return (
    <div className={styles.loginWrapper} onClick={onMaskClick}>
      <div className={styles.modalWrapper}>
        <button className={styles.closeBtn} onMouseDown={onModalClose}>
          <img src='/images/icon-close.svg' alt='로그인 모달 닫기' />
        </button>
        <img src='/images/img-everyshare-logo.svg' alt='에브리쉐어 로고' />
        <LoginForm onModalOpen={onModalOpen} onModalClose={onModalClose} />
      </div>
    </div>
  );
};

Login.propTypes = {
  onClickLoginModal: PropTypes.func,
};

export default Login;
