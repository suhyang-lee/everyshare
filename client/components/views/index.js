import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';

import CommentList from 'components/views/comment/commentList';
import CommentInput from 'components/views/comment/commentInput';
import ProductSlider from 'components/views/slider';
import ApplyModal from 'components/views/apply';

import { CATEOGRY } from 'utils/variables';
import POST from 'actions/postAction';
import styles from './view.module.scss';

const AchorStyle = styled(AnchorLink)`
  color: #000;
  cursor: pointer;
`;

const View = ({ post }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  const [days, setDays] = useState(1);
  const [isBasket, setIsBasket] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [zzim, setZzim] = useState(false);

  const id = user?.id;

  useEffect(() => {
    const result = post.Basketer.find((v) => v.id === id);
    if (!result) return;
    setIsBasket(true);
  }, [post]);

  const getPrice = (days) => {
    const result = parseInt(days * post.price + post.deposit);
    return result;
  };

  const price = useMemo(() => getPrice(days), [days]);

  const handleMinus = useCallback(() => {
    if (days > 1) {
      setDays((prevDays) => prevDays - 1);
    }
  }, [days]);

  const handlePlus = useCallback(() => {
    if (days <= 365) {
      setDays((prevDays) => prevDays + 1);
    }
  }, [days]);

  const onZzimed = useCallback(() => {
    setZzim(!zzim);
    if (zzim) {
      dispatch({
        type: POST.ZZIM_POST_REQUEST,
        data: { postId: post.id },
      });

      setIsBasket(true);
    } else {
      dispatch({
        type: POST.NOT_ZZIM_POST_REQUEST,
        data: { postId: post.id },
      });
      setIsBasket(false);
    }
  }, [post, zzim]);

  const onPostUpdate = useCallback(() => {
    if (post.id) {
      router.push(`/modify?postId=${post.id}`);
    }
  }, [post]);

  const onPostRemove = useCallback(() => {
    if (post.id) {
      dispatch({ type: POST.REMOVE_POST_REQUEST, data: { postId: post.id } });
    }
  }, [post]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <div className={styles.contentsWrapper}>
      {/* 기본 제품 정보 */}
      {user.id === post.UserId && (
        <div className={styles.buttonGroup}>
          <button onClick={onPostUpdate}>글 수정</button>
          <button onClick={onPostRemove}>글 삭제</button>
        </div>
      )}

      <section className={styles.viewInfoWrapper}>
        <div className={styles.infoImagesWrapper}>
          {<ProductSlider Images={post.Images} />}
        </div>
        <div className={styles.infoWrapper}>
          <h4>{CATEOGRY[post.category]}</h4>
          <h5>{post.title}</h5>
          <div className={styles.buyBtnWrapper}>
            {user.id !== post.UserId && (
              <>
                <button onClick={openModal}>신청하기</button>
                <button onClick={onZzimed}>
                  찜하기{' '}
                  {isBasket ? (
                    <HeartFilled style={{ color: 'red' }} />
                  ) : (
                    <HeartOutlined />
                  )}
                </button>
              </>
            )}
          </div>
          <div className={styles.writerInfo}>
            <div className={styles.profileImage}>
              <img
                src={post.User.profileUrl}
                alt={`${post.User.nickname}의 프로필`}
              />
            </div>
            <div className={styles.profileInfo}>
              <p>{post.User.nickname}</p>
              <span className={styles.prfileId}>
                @{post.User.email && post.User.email.split('@')[0]}
              </span>
            </div>
          </div>
          <div className={styles.priceWrapper}>
            <p>기간(일)</p>
            <button className={styles.dayBtn} onClick={handleMinus}>
              -
            </button>
            <p>{days}</p>
            <button className={styles.dayBtn} onClick={handlePlus}>
              +
            </button>
          </div>
          <div className={styles.priceWrapper}>
            <p>보증금</p>
            <p>{post.deposit} 원</p>
          </div>
          <div className={styles.totalPriceWrapper}>
            <p>
              예상 대여비<span>(일 {post.price} 원 기준)</span>
            </p>
            <p>
              {price ? price : parseInt(days * post.price + post.deposit)} 원
            </p>
          </div>
        </div>
      </section>

      {/* 댓글 및 내용  */}
      <section className={styles.viewContents}>
        <ul className={styles.menu}>
          <li>내용보기</li>
          <li>
            <AchorStyle offset='200' href='#comment'>
              댓글보기 ({post.Comments.length})
            </AchorStyle>
          </li>
        </ul>
        <article className={styles.productContents}>
          <div
            className={styles.contents}
            dangerouslySetInnerHTML={{ __html: post.contents }}
          ></div>
        </article>
        <article className={styles.productContents} id='comment'>
          <ul>
            {post.Comments.map((comment) => {
              return <CommentList comment={comment} key={comment.id} />;
            })}
          </ul>
          {post && post.id ? <CommentInput postId={post.id} /> : <></>}
        </article>
      </section>
      <ApplyModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

View.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    postType: PropTypes.string,
    category: PropTypes.string,
    rentTerm: PropTypes.string,
    title: PropTypes.string,
    priceType: PropTypes.string,
    price: PropTypes.number,
    deposit: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    UserId: PropTypes.number,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default View;
