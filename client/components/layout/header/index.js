/* 페이지 공통 헤더  */
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import styles from './header.module.scss';

import Login from 'components/login';
import Category from 'components/layout/category';
import Search from 'components/layout/header/search';
import useModal from 'hooks/useModal';
import useToggle from 'hooks/useToggle';
import { useRouter } from 'next/router';

const HeaderLink = styled.a`
  color: black;
  cursor: pointer;
`;

const Header = () => {
  const router = useRouter();
  const { user, logoutDone } = useSelector((state) => state.user);

  const [isOpen, onClickOpen] = useToggle(false);
  const [isSearchShow, onClickSearch] = useToggle(false);
  const [isShowModal, onModalOpen, onModalClose] = useModal(false);

  useEffect(() => {
    if (logoutDone && !user) {
      router.push('/');
    }
  }, [logoutDone, user]);

  const onLogOut = useCallback(() => {
    router.push('/logout');
  }, []);

  return (
    <>
      {isSearchShow && <Search onClickSearch={onClickSearch} />}
      {isShowModal && (
        <Login onModalOpen={onModalOpen} onModalClose={onModalClose} />
      )}
      <header className={styles.header}>
        <div className={styles.headerItemsWrapper}>
          <div className={styles.headerItem}>
            <div className={styles.headerMenuBtn} onClick={onClickOpen}>
              <img src='/images/icon-menu.svg' alt='메뉴열기' />
              <h2>카테고리</h2>
            </div>
          </div>

          <div className={styles.headerItem}>
            <Link href='/'>
              <h1>
                <img src='/images/img-everyshare-logo.svg' alt='에브리쉐어' />
              </h1>
            </Link>
          </div>

          <div className={styles.headerItem}>
            <nav className={styles.gnbNav}>
              <ul className={styles.gnbUl}>
                {user ? (
                  <>
                    <li>
                      <h2>
                        <Link href='/mypage/info'>
                          <HeaderLink>마이페이지</HeaderLink>
                        </Link>
                      </h2>
                    </li>
                    <li onClick={onLogOut}>
                      <h2>로그아웃</h2>
                    </li>
                    <Link href='/mypage/items'>
                      <li className={styles.circleBtn}>
                        <div className={styles.zzimed}>
                          {user.Zzimed.length || 0}
                        </div>
                        <img src='/images/icon-shopping.svg' alt='담아두기' />
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <li>
                      <h2 onClick={onModalOpen}>로그인</h2>
                    </li>
                    <li>
                      <h2>
                        <Link href='/signup'>
                          <HeaderLink>회원가입</HeaderLink>
                        </Link>
                      </h2>
                    </li>
                  </>
                )}

                <li className={styles.circleBtn} onClick={onClickSearch}>
                  <img src='/images/icon-search.svg' alt='검색하기' />
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {isOpen && <Category onClickOpen={onClickOpen} isOpen={isOpen} />}
      </header>
    </>
  );
};

export default Header;
