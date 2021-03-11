import React from "react";
import Head from "next/head";
import { END } from "redux-saga";

import wrapper from "store/configureStore";
import AppLayout from "components/layout/appLayout";
import Contents from "components/home";
import Auth from "lib/api/auth";

const Home = () => {
  return (
    <AppLayout>
      <Head>
        <title>홈 | EveryShare</title>
      </Head>
      <Contents />
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

export default Home;
