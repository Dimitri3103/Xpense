import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { ButtonBlue, ButtonPink } from "../../styles/others";

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    textAlign: "center",
    font: "normal normal bold 1.3vw Open Sans",
  },
  dialogAction: { justifyContent: "center" },
}));

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={confirmDialog.isOpen}
      PaperProps={{
        style: {
          boxShadow: "0px 3px 23px #00000033",
          borderRadius: 17,
        },
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <div
          style={{
            color: "#07114B",
          }}
        >
          {confirmDialog.title}
        </div>
        <div
          style={{
            color: "#FB2B76",
            fontSize: "80%",
          }}
        >
          {confirmDialog.subTitle}
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <ButtonBlue onClick={confirmDialog.onConfirm}>Oui</ButtonBlue>
        <ButtonPink
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          Non
        </ButtonPink>
      </DialogActions>
    </Dialog>
  );
}
