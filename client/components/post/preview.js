import React, { useCallback } from 'react';
import styles from './post.module.scss';
import { CloseCircleFilled } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import POST from 'actions/postAction';

const Preview = ({ image, post }) => {
  const dispatch = useDispatch();

  const onRemoveImage = useCallback(() => {
    if (post) {
      dispatch({
        type: POST.REMOVE_IMAGES_REQUEST,
        data: { id: image.id },
      });
    } else {
      dispatch({
        type: POST.REMOVE_IMAGE,
        data: image.id,
      });
    }
  }, []);

  return (
    <div className={styles.imagePreviews}>
      <CloseCircleFilled className={styles.closeBtn} onClick={onRemoveImage} />
      <img src={image.src} alt={image.src} />
    </div>
  );
};

export default Preview;
