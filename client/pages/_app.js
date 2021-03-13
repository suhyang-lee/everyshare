import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "styles/global.css";

import wrapper from "store/configureStore";

const EveryShare = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>EveryShare</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

EveryShare.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(EveryShare);
