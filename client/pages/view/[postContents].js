import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { END } from "redux-saga";
import axios from "axios";
import wrapper from "store/configureStore";

import USER from "actions/userAction";
import POST from "actions/postAction";

import AppLayout from "components/layout/appLayout";
import View from "components/views";

const PostContents = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const postId = router.query.postContents;

  const { post, removePostDone, zzimPostDone } = useSelector(
    (state) => state.post,
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (zzimPostDone) {
      dispatch({
        type: USER.LOAD_USER_INFO_REQUEST,
      });
    }
  }, [post]);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  useEffect(() => {
    if (removePostDone) {
      router.replace(`/board/${post.category}`);
    }
  }, [removePostDone]);

  useEffect(() => {
    if (user) {
      dispatch({
        type: POST.LOAD_POST_REQUEST,
        data: { postId },
      });
    }
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>게시물 상세보기 | EveryShare</title>
      </Head>
      {user && <View post={post} />}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: USER.LOAD_USER_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default PostContents;
