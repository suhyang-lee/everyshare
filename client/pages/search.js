import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import _ from 'lodash/array';
import Auth from 'lib/api/auth';
import wrapper from 'store/configureStore';

import AppLayout from 'components/layout/appLayout';
import BoardList from 'components/board';

import SEARCH from 'actions/searchAction';

const Search = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { keyword } = router.query;

  const { searchs, hasMoreSearch, loadSearchLoading } = useSelector(
    (state) => state.search,
  );

  useEffect(() => {
    const newKeyword = {
      id: Date.now(),
      keyword: keyword,
    };

    const keywordList = JSON.parse(localStorage.getItem('keywords') || '[]');

    if (keywordList.length >= 10) keywordList.pop();

    keywordList.unshift(newKeyword);
    const keywords = _.uniqBy(keywordList, 'keyword');

    localStorage.setItem('keywords', JSON.stringify([...keywords]));
  }, [keyword]);

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreSearch && !loadSearchLoading) {
          dispatch({
            type: SEARCH.LOAD_SEARCH_REQUEST,
            lastId:
              searchs[searchs.length - 1] && searchs[searchs.length - 1].id,
            data: keyword,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMoreSearch, loadSearchLoading, searchs.length, keyword]);

  return (
    <>
      <Head>
        <title>게시물 리스트 보기 | EveryShare</title>
      </Head>
      <BoardList posts={searchs} title='통합검색' />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    await Auth.validateAuth(context);

    context.store.dispatch({
      type: SEARCH.LOAD_SEARCH_REQUEST,
      data: context.query.keyword,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Search;
