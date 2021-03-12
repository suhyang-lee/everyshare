import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { SnippetsOutlined } from "@ant-design/icons";
import PostCard from "components/board/postCard";
import styles from "./board.module.scss";
import Filter from "./filter";

const Board = ({ posts, title }) => {
  const { loadPostsDone } = useSelector((state) => state.post);
  const { loadSearchDone } = useSelector((state) => state.search);
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("all");

  const onFilterOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <section className={styles.contentsWrapper}>
      <div className={styles.titleWrapper}>
        <h3>{title}</h3>
        <div className={styles.filterWrapper}>
          <button onClick={onFilterOpen}>
            필터
            <img src="../images/icon-filter.svg" alt="필터" />
          </button>
          {open && <Filter setFilterValue={setFilterValue} />}
        </div>
      </div>
      {(loadPostsDone || loadSearchDone) && posts.length === 0 && (
        <div className={styles.nonePost}>
          <span>
            <SnippetsOutlined />
            현재 게시물이 존재하지않아요!
          </span>
          <Link href="/post">
            <button>가장 먼저 글쓰기</button>
          </Link>
        </div>
      )}

      <div className={styles.listContents}>
        {posts &&
          posts
            .filter((v) => v.postType !== filterValue)
            .map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
      </div>
    </section>
  );
};

Board.propTypes = {
  category: PropTypes.string,
};

export default Board;
