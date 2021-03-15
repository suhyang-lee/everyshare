import React from 'react';
import Head from 'next/head';
import { END } from 'redux-saga';

import wrapper from 'store/configureStore';
import Auth from 'lib/api/auth';

import Main from 'components/about';

const About = () => {
  return (
    <>
      <Head>
        <title>에브리쉐어에 대해 | EveryShare</title>
      </Head>
      <Main />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await Auth.validateAuth(context);
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default About;
