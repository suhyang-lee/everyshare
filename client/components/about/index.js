import React from "react";

import styles from "./about.module.scss";

const About = () => {
  return (
    <section className={styles.wrapper}>
      <article className={styles.contents}>
        <h4>에브리쉐어는 모든 것을 공유합니다</h4>
        <p>
          에브리쉐어에서는 공유의 가치에서 의미를 찾고 있습니다. <br />{" "}
          누군가에게는 필요한 물건이 누군가에게는 필요하지 않은 물건이 되는
          가치를 발굴합니다.
        </p>
      </article>
    </section>
  );
};

export default About;
