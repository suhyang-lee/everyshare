import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Head from 'next/head';
import 'styles/global.css';

import wrapper from 'store/configureStore';
import AppLayout from 'components/layout/appLayout';
import Layout from 'components/layout/layout';
import { useRouter } from 'next/router';

const EveryShare = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/login' ? (
        <Layout>
          {' '}
          <Head>
            <title>EveryShare</title>
            <link rel='shortcut icon' href='/favicon.ico' />
          </Head>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <AppLayout>
          <Head>
            <title>EveryShare</title>
            <link rel='shortcut icon' href='/favicon.ico' />
          </Head>
          <Component {...pageProps} />
        </AppLayout>
      )}
    </>
  );
};

EveryShare.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(EveryShare);
