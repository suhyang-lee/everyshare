/* 페이지 공통 헤더  */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Router from 'next/router';

import { SearchOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons';

import styles from './search.module.scss';
import useInput from 'hooks/useInput';
import useMouseLock from 'hooks/useMouseLock';

const Search = ({ onClickSearch }) => {
  const [search, onChangeSearch] = useInput('');
  const searchRef = useRef();

  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem('keywords') || '[]'),
  );

  useMouseLock();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const onSearchKeyword = useCallback((e) => {
    const prevKeyword = e.currentTarget.innerText.split(' ')[0];

    onClickSearch();
    Router.push(`/search?keyword=${prevKeyword}`);
  }, []);

  const onSearch = () => {
    onClickSearch();
    Router.replace(`/search?keyword=${search}`);
  };

  const onRemoveKeyword = useCallback((e) => {
    e.stopPropagation();
    const id = e.currentTarget.id;

    const filterKeyword = keywords.filter((el) => {
      return el.id != id;
    });

    localStorage.setItem('keywords', JSON.stringify([...filterKeyword]));

    setKeywords(filterKeyword);
  });

  return (
    <>
      <div className={styles.backgroundWrapper}>
        <div className={styles.searchWrapper}>
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              <img src='/images/img-everyshare-logo.svg' alt='에브리쉐어' />
            </div>
            <form onSubmit={onSearch}>
              <input
                type='search'
                name='userSearch'
                value={search}
                onChange={onChangeSearch}
                placeholder='검색어를 입력하세요'
                ref={searchRef}
              />
              <button type='submit'>
                <SearchOutlined />
              </button>
            </form>
          </div>
          <button className={styles.closeBtn} onClick={onClickSearch}>
            <CloseOutlined />
          </button>
          <ul className={styles.keywordList}>
            {keywords &&
              keywords.map((keyword) => {
                return (
                  <li key={keyword.id} onClick={onSearchKeyword}>
                    {keyword.keyword}{' '}
                    <button onClick={onRemoveKeyword} id={keyword.id}>
                      ✖
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Search;
