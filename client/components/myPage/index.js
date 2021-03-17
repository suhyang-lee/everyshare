import React from 'react';

import Sidebar from 'components/myPage/sidebar';
import Contents from 'components/myPage/contents';
import Transaction from 'components/myPage/transaction';
import MyContents from 'components/myPage/myContents';
import UserInfo from 'components/myPage/userInfo';
import Signout from 'components/myPage/signout';
import MyList from 'components/myPage/myList';

import styles from './userInfo.module.scss';
import { TITLEINFO, MYPAGETYPE } from 'utils/variables';

const MypageContents = ({ path, userInfo }) => {
  const pageType = MYPAGETYPE[path];
  return (
    <section className={styles.wrapper}>
      <Sidebar />
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
