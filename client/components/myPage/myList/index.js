import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MYPAGE from "actions/mypageAction";
import styles from "./mylist.module.scss";
import List from "./list";

const MyList = () => {
  const dispatch = useDispatch();
  const { myZzimList } = useSelector((state) => state.mypage);

  useEffect(() => {
    dispatch({
      type: MYPAGE.LOAD_MY_ZZIM_LIST_REQUEST,
    });
  }, []);

  return (
    <>
      <p>총 {myZzimList && myZzimList.length}건</p>
      <ul className={styles.list}>
        {myZzimList && myZzimList.length === 0 && (
          <div className={styles.empty}>
            아직까지 담겨있는 제품이 없어요! 😥
          </div>
        )}
        {myZzimList &&
          myZzimList.map((zzim) => <List key={zzim.id} zzim={zzim} />)}
      </ul>
    </>
  );
};

export default MyList;
