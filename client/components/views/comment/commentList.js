import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import styles from "./comment.module.scss";
import { DeleteOutlined, EditOutlined, AlertOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import useInput from "hooks/useInput";

import POST from "actions/postAction";

const CommentList = ({ comment }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [contents, onChangeContents] = useInput(comment?.contents);

  const onInputOpen = useCallback(() => {
    setOpen(true);
  }, [onInputOpen]);

  const onRemoveComment = useCallback(() => {
    const state = confirm("댓글을 정말 삭제하시겠어요?");

    if (!state) return;

    dispatch({
      type: POST.REMOVE_COMMENT_REQUEST,
      data: { commentId: comment.id },
    });
  }, [onRemoveComment]);

  const onModifyComment = useCallback(() => {
    const state = confirm("댓글을 수정하시겠어요?");

    if (!state) return;

    dispatch({
      type: POST.UPDATE_COMMENT_REQUEST,
      data: { commentId: comment.id, contents: contents },
    });

    setOpen(false);
  }, [contents]);

  return (
    <li className={styles.commentWrapper}>
      <div className={styles.commentProfile}>
        <div className={styles.userProfileImage}>
          <img src={comment.User.profileUrl} alt="프로필이미지" />
        </div>
        <p>{comment.User.nickname}</p>
        <p>@{comment.User.email && comment.User.email.split("@")[0]}</p>
      </div>
      <div className={styles.commentContents}>
        <div className={styles.commentInfo}>
          <p>{moment(comment.updatedAt).format("YYYY/MM/DD H:MM")}</p>

          {user.id === comment.User.id ? (
            <>
              <button onClick={onInputOpen}>
                <EditOutlined alt="게시물 수정하기" />
              </button>
              <button onClick={onRemoveComment}>
                <DeleteOutlined alt="게시물 삭제하기" />
              </button>
            </>
          ) : (
            <button>
              <AlertOutlined alt="신고하기" />
            </button>
          )}
        </div>
        {open ? (
          <div className={styles.modifyComment}>
            <textarea value={contents} onChange={onChangeContents} />{" "}
            <button onClick={onModifyComment}>수정하기</button>
          </div>
        ) : (
          <p>{comment.contents}</p>
        )}
      </div>
    </li>
  );
};

CommentList.propTypes = {
  comment: PropTypes.object,
};
export default CommentList;
