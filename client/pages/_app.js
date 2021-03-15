import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'styles/global.css';

import wrapper from 'store/configureStore';
import LoadingIcon from 'components/common/loadingIcon';

const EveryShare = ({ Component, pageProps }) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  React.useEffect(() => {
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
      <Head>
        <title>EveryShare</title>
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      {pageLoading ? (
        <LoadingIcon height='100vh' />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};

EveryShare.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(EveryShare);
