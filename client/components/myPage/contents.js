import React from "react";

import styles from "./contents.module.scss";

const Contents = ({ children, info }) => {
  return (
    <section className={styles.userContents}>
      <h3 className={styles.title}>{info?.title}</h3>
      <p className={styles.title}>{info?.discription}</p>
      <article className={styles.contents}>{children}</article>
    </section>
  );
};

export default Contents;
