import { useEffect } from "react";
import wrapper from "store/configureStore";
import { END } from "redux-saga";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import USER from "actions/userAction";

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { logoutDone } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: USER.LOG_OUT_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (logoutDone) {
      router.push("/");
    }
  }, [logoutDone]);
  return <div>로그아웃처리중</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Logout;
