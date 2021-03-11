import React, { useEffect } from "react";

import Head from "next/head";
import Link from "next/link";
import { END } from "redux-saga";

import wrapper from "store/configureStore";
import styled from "styled-components";

import Layout from "components/layout/layout";
import LoginForm from "components/login/loginForm";
import styles from "components/login/login.module.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";

const HeaderLink = styled.a`
  color: black;
  cursor: pointer;
`;

const LoginPage = () => {
  const { user, loginDone } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (loginDone) {
      router.push("/");
    }
  }, [user, loginDone]);

  return (
    <Layout>
      <Head>
        <title>로그인 | EveryShare</title>
      </Head>
      <div className={styles.loginWrapper}>
        <div className={styles.modalWrapper}>
          <Link href="/">
            <HeaderLink>
              <img
                src="/images/img-everyshare-logo.svg"
                alt="에브리쉐어 로고"
              />
            </HeaderLink>
          </Link>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default LoginPage;
