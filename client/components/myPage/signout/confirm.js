import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Confirm = ({ open, handleClose, handleConfirm }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"에브리쉐어 회원탈퇴"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            탈퇴 후에는 해당 아이디로 다시 가입할 수 없으며 아이디와 데이터는
            복구할 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary" value="disagree">
            동의하지않습니다
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            value="agree"
            autoFocus
          >
            동의합니다
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirm;
