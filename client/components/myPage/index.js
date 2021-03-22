import React, { useEffect, useState } from "react";

import Sidebar from "components/myPage/sidebar";
import Contents from "components/myPage/contents";
import Transaction from "components/myPage/transaction";
import MyContents from "components/myPage/myContents";
import UserInfo from "components/myPage/userInfo";
import Signout from "components/myPage/signout";
import MyList from "components/myPage/myList";

import styles from "./userInfo.module.scss";
import { TITLEINFO, MYPAGETYPE } from "utils/variables";
import useModal from "hooks/useModal";
import useWindowSize from "hooks/useWindowSize";
import MobileBar from "./mobilebar";

const MypageContents = ({ path, userInfo }) => {
  const pageType = MYPAGETYPE[path];
  const size = useWindowSize();
  const [isHeaderShow, onHeaderOpen, onHeaderClose] = useModal(false);
  const [isMenu, onMenuOpen, onMenuClose] = useModal(true);

  useEffect(() => {
    if (size.width >= 360) {
      onMenuOpen();
      onHeaderClose();
    }
  }, [size]);

  return (
    <section className={styles.wrapper}>
      {size.width <= 360 ||
        (isHeaderShow && (
          <MobileBar
            onMenuOpen={onMenuOpen}
            onHeaderOpen={onHeaderOpen}
            onHeaderClose={onHeaderClose}
          />
        ))}
      {isMenu && (
        <Sidebar onMenuClose={onMenuClose} onHeaderOpen={onHeaderOpen} />
      )}
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
