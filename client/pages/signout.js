import { useEffect } from "react";
import wrapper from "store/configureStore";
import { END } from "redux-saga";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import USER from "actions/userAction";

const SignOut = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signoutDone } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: USER.SIGN_OUT_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (signoutDone) {
      router.push("/");
    }
  }, [signoutDone]);

  return <div>회원탈퇴 처리중</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default SignOut;
