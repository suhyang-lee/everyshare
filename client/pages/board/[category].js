import React, { useEffect } from 'react';
import Head from 'next/head';
import { END } from 'redux-saga';
import wrapper from 'store/configureStore';

import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Auth from 'lib/api/auth';

import { CATEOGRY } from 'utils/variables';

import POST from 'actions/postAction';
import BoardList from 'components/board';
import LoadingIcon from 'components/common/loadingIcon';

const Board = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { category } = router.query;

  const { hasMorePost, loadPostsLoading } = useSelector((state) => state.post);
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 200
      ) {
        if (hasMorePost && !loadPostsLoading) {
          const lastId = posts[posts.length - 1]?.id;

          dispatch({
            type: POST.LOAD_POSTS_REQUEST,
            lastId,
            data: category,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostsLoading, posts]);

  return (
    <>
      <Head>
        <title>게시물 리스트 보기 | EveryShare</title>
      </Head>

      <BoardList posts={posts} title={CATEOGRY[category]} />

      {hasMorePost && <LoadingIcon height='auto' />}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await Auth.validateAuth(context);
    context.store.dispatch({
      type: POST.LOAD_POSTS_REQUEST,
      data: context.query.category,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Board;
