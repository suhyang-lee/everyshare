import React, { useCallback, useEffect, useState } from "react";
import styles from "./sidebar.module.scss";
import { LeftOutlined } from "@ant-design/icons";
import { TITLEINFO } from "utils/variables";
import { useRouter } from "next/dist/client/router";

const MobileBar = ({ onMenuOpen, onHeaderClose }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const path = router.asPath.split("/");
    setTitle(TITLEINFO[path[2]].title);
  }, [title]);

  const onMypageMenu = useCallback(() => {
    onHeaderClose();
    onMenuOpen();
  }, []);

  return (
    <header className={styles.mobileBar}>
      <LeftOutlined onClick={onMypageMenu} />
      <span>{title}</span>
      <span></span>
    </header>
  );
};

export default MobileBar;
