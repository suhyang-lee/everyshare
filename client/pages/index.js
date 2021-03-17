import React from 'react';
import Head from 'next/head';
import { END } from 'redux-saga';

import wrapper from 'store/configureStore';
import Contents from 'components/home';
import Auth from 'lib/ssr/auth';

const metaContents = {
  description: '모든 것을 공유하는 에브리쉐어',
  keyword: '물건공유, 에브리쉐어, 대여하기, 프론트엔드개발자',
};

const Home = () => {
  return (
    <>
      <Head>
        <title>홈 | EveryShare</title>
      </Head>
      <meta name='description' content={metaContents.description} />
      <meta name='keyword' content={metaContents.keyword} />
      <meta property='og:title' content={'에브리쉐어 | 물건공유플랫폼'} />
      <meta property='og:description' content={metaContents.description} />
      <meta property='og:image' content={'/images/them.jpg'} />
      <meta property='og:url' content={`http://everyshare.shop`} />
      <Contents />
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

export default Home;
