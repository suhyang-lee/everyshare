import React, { useCallback, useState } from "react";
import styles from "./filter.module.scss";

const Filter = ({ setFilterValue }) => {
  const [state, setState] = useState("all");

  const onClickRadioButton = useCallback(
    (e) => {
      setState(e.target.value);
      setFilterValue(e.target.value);
    },
    [state],
  );

  return (
    <div className={styles.filter}>
      <div className={styles.filterItem}>
        <input
          type="radio"
          id="all"
          name="filter"
          value="all"
          onChange={onClickRadioButton}
          checked={state === "all"}
        />
        <label htmlFor="all">전체보기</label>
      </div>
      <div className={styles.filterItem}>
        <input
          type="radio"
          id="owner"
          name="filter"
          value="owner"
          onChange={onClickRadioButton}
          checked={state === "owner"}
        />
        <label htmlFor="owner">빌려주기</label>
      </div>
      <div className={styles.filterItem}>
        <input
          type="radio"
          id="borrower"
          name="filter"
          value="borrower"
          onChange={onClickRadioButton}
          checked={state === "borrower"}
        />
        <label htmlFor="borrower">빌리기</label>
      </div>
    </div>
  );
};

export default Filter;
