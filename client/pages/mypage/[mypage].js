import React from "react";
import Head from "next/head";
import { END } from "redux-saga";
import wrapper from "store/configureStore";
import { useRouter } from "next/router";
import authAPI from "lib/api/auth";
import Auth from "lib/ssr/auth";

import Contents from "components/myPage";

const Mypage = ({ userInfo }) => {
  const { query } = useRouter();
  return (
    <>
      <Head>
        <title>마이페이지 | EveryShare</title>
      </Head>
      <Contents path={query.mypage} userInfo={userInfo} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    let userInfo = await Auth.validateAuth(context);
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();

    return {
      props: { userInfo: userInfo }, // will be passed to the page component as props
    };
  }
);

export default Mypage;
