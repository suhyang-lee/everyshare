import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Head from 'next/head';
import 'styles/global.css';

import wrapper from 'store/configureStore';
import AppLayout from 'components/layout/appLayout';
import Layout from 'components/layout/layout';
import LoadingIcon from 'components/common/loadingIcon';
import { useRouter } from 'next/router';

const EveryShare = ({ Component, pageProps }) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <>
      {router.pathname === '/login' ? (
        <Layout>
          {' '}
          <Head>
            <title>EveryShare</title>
            <link rel='shortcut icon' href='/favicon.ico' />
          </Head>
          {pageLoading ? (
            <LoadingIcon height='100vh' />
          ) : (
            <Component {...pageProps} />
          )}{' '}
        </Layout>
      ) : (
        <AppLayout>
          <Head>
            <title>EveryShare</title>
            <link rel='shortcut icon' href='/favicon.ico' />
          </Head>
          {pageLoading ? (
            <LoadingIcon height='100vh' />
          ) : (
            <Component {...pageProps} />
          )}
        </AppLayout>
      )}
    </>
  );
};

EveryShare.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(EveryShare);
