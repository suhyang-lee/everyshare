import React, { useEffect, useState } from 'react';

import Sidebar from 'components/myPage/sidebar';
import MobileSideBar from 'components/myPage/mobileSideBar';
import Contents from 'components/myPage/contents';
import Transaction from 'components/myPage/transaction';
import MyContents from 'components/myPage/myContents';
import UserInfo from 'components/myPage/userInfo';
import Signout from 'components/myPage/signout';
import MyList from 'components/myPage/myList';

import styles from './userInfo.module.scss';
import { TITLEINFO, MYPAGETYPE } from 'utils/variables';
import useModal from 'hooks/useModal';
import { useWindowWidth } from '@react-hook/window-size';
import MobileBar from './mobilebar';

const MypageContents = ({ path, userInfo }) => {
  const pageType = MYPAGETYPE[path];
  const size = useWindowWidth();
  const [isHeaderShow, onHeaderOpen, onHeaderClose] = useModal(false);
  const [isMenu, onMenuOpen, onMenuClose] = useModal(true);

  useEffect(() => {}, [size]);

  return (
    <section className={styles.wrapper}>
      {size < 700
        ? isHeaderShow && (
            <MobileBar
              onMenuOpen={onMenuOpen}
              onHeaderOpen={onHeaderOpen}
              onHeaderClose={onHeaderClose}
            />
          )
        : ''}
      {isMenu && size < 700 && (
        <MobileSideBar onMenuClose={onMenuClose} onHeaderOpen={onHeaderOpen} />
      )}

      {size >= 720 && <Sidebar />}

      <Contents info={TITLEINFO[path]}>
        {pageType === 0 && <Transaction path={path} />}
        {pageType === 1 && <MyContents path={path} />}
        {pageType === 2 && <UserInfo path={path} userInfo={userInfo} />}
        {pageType === 3 && <Signout path={path} />}
        {pageType === 4 && <MyList path={path} />}
      </Contents>
    </section>
  );
};

export default MypageContents;
