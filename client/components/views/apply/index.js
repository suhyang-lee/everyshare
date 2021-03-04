import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import Grid from "@material-ui/core/Grid";

import MaterialUIPickers from "components/views/apply/picker";
import styled from "styled-components";
import POST from "actions/postAction";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "2rem",
    borderRadius: "20px",
  },
};

const Head = styled.h3`
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  border-bottom: 1px solid #dfdfdfab;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`;

const ApplyButton = styled.button`
  width: 50%;
  height: 3rem;
  background-color: #000;
  border-radius: 50px;
  color: #fff;
  font-size: 1rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
`;

const Apply = ({ modalIsOpen, closeModal, writer }) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const onSubmit = useCallback(() => {
    const { price, deposit, UserId, id } = post;
    const data = {
      rentalDate: selectedStartDate,
      returnDate: selectedEndDate,
      price: price,
      deposit: deposit,
      ownerId: UserId,
      lenderId: user.id,
      PostId: id,
    };

    closeModal();

    dispatch({
      type: POST.APPLY_RENTAL_REQUEST,
      data,
    });
  }, [selectedStartDate, selectedEndDate, post]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="거래 신청하기"
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Head>대여 신청</Head>
        </Grid>

        <Grid container spacing={3} justify="space-evenly">
          <MaterialUIPickers
            selectedDate={selectedStartDate}
            handleDateChange={handleStartDateChange}
            id="date-picker-start"
            title="대여 시작 날짜"
          />
          <MaterialUIPickers
            selectedDate={selectedEndDate}
            handleDateChange={handleEndDateChange}
            id="date-picker-end"
            title="대여 종료 날짜"
          />
        </Grid>

        <Grid container justify="center">
          <ApplyButton onClick={onSubmit}>신청하기</ApplyButton>
        </Grid>
      </Grid>
    </Modal>
  );
};

Apply.propTypes = {};

export default Apply;
