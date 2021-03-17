import { useState, useCallback } from 'react';

const useModal = (initValue = false) => {
  const [isShowModal, setIsShowModal] = useState(initValue);

  const onModalOpen = useCallback(() => {
    setIsShowModal(true);
  }, [setIsShowModal, isShowModal]);

  const onModalClose = useCallback(() => {
    setIsShowModal(false);
  }, [setIsShowModal, isShowModal]);

  return [isShowModal, onModalOpen, onModalClose];
};

export default useModal;
