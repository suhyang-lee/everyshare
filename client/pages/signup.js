import React from "react";
import Head from "next/head";

import { END } from "redux-saga";
import wrapper from "store/configureStore";

import AppLayout from "components/layout/appLayout";
import Signup from "components/signup";

const SignUp = () => {
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | EveryShare</title>
      </Head>
      <Signup />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default SignUp;
