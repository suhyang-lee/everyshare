import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { END } from 'redux-saga';
import wrapper from 'store/configureStore';
import POST from 'actions/postAction';
import { useRouter } from 'next/router';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import { useDispatch, useSelector } from 'react-redux';
import Auth from 'lib/ssr/auth';

import { CATEOGRY } from 'utils/variables';

import BoardList from 'components/board';

const Board = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { category } = router.query;
  const [target, setTarget] = useState(null);
  const [root, setRoot] = useState(null);

  const posts = useSelector((state) => state.post.posts);
  const { hasMorePost, loadPostsLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (!category) return;

    dispatch({
      type: POST.LOAD_POSTS_REQUEST,
      data: category,
    });
  }, []);

  useInfiniteScroll({
    root,
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting) {
        if (!category) return;
        const lastId = posts[posts.length - 1]?.id;

        if (hasMorePost && !loadPostsLoading) {
          dispatch({
            type: POST.LOAD_POSTS_REQUEST,
            lastId,
            data: category,
          });
        }
      }
    },
  });

  return (
    <>
      <Head>
        <title>게시물 리스트 보기 | EveryShare</title>
      </Head>
      <BoardList
        title={CATEOGRY[category]}
        posts={posts}
        setTarget={setTarget}
        setRoot={setRoot}
      />
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

export default Board;
