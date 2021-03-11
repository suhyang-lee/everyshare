import React from "react";
import Head from "next/head";
import { END } from "redux-saga";
import wrapper from "store/configureStore";
import { useRouter } from "next/router";

import Auth from "lib/api/auth";

import AppLayout from "components/layout/appLayout";
import Contents from "components/myPage";

const Mypage = () => {
  const { query } = useRouter();
  return (
    <AppLayout>
      <Head>
        <title>마이페이지 | EveryShare</title>
      </Head>
      <Contents path={query.mypage} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await Auth.validateAuth(context);
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Mypage;
