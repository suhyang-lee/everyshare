import React, { useCallback, useState } from "react";

import styles from "./signout.module.scss";

import Confirm from "./confirm";
import { useRouter } from "next/router";

const Singout = () => {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCheckAgree = useCallback(
    (e) => {
      setAgree(e.target.checked);
    },
    [agree, setAgree],
  );

  const onClickSignOut = useCallback(
    (e) => {
      e.preventDefault();
      if (!agree) setAgreeError(true);

      handleOpen();
    },
    [agree],
  );

  const handleConfirm = useCallback(
    (e) => {
      const state = e.currentTarget.value;

      if (state === "disagree") return;

      handleClose();
      router.push("/signout");
    },
    [setOpen],
  );

  return (
    <>
      {open && (
        <Confirm
          open={open}
          handleClose={handleClose}
          handleConfirm={handleConfirm}
        />
      )}
      <article className={styles.contents}>
        <p>
          에브리쉐어 탈퇴 시, 해당 서비스 이용이 불가합니다. 유의사항 및 안내를
          반드시 읽고 진행 해 주세요!
        </p>
        <div className={styles.notice}>
          <p>회원 탈퇴 신청을 위해서 아래 사항을 모두 확인 해 주세요.</p>
          <ul>
            <li>모든 서비스는 탈퇴 후 이용이 불가능합니다.</li>
            <li>모든 서비스 종료 전에 진행하고 있는 거래를 마무리해 주세요.</li>
            <li>
              거래가 마무리가 되지 않는다면 법적인 분쟁이 발생할 수 있습니다.
            </li>
          </ul>

          <div className={styles.agree}>
            <input
              type="checkbox"
              id="agree"
              name="agree"
              value="agree"
              defaultChecked={agree}
              onChange={onCheckAgree}
            />
            <label htmlFor="agree">
              유의사항 및 안내에 대해 모두 동의합니다.
            </label>
          </div>
        </div>
        <button
          className={styles.signoutBtn}
          type="button"
          onClick={onClickSignOut}
        >
          회원탈퇴하기
        </button>
      </article>
    </>
  );
};

export default Singout;
