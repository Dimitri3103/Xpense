import React from "react";
import { Dialog, Grid, makeStyles } from "@material-ui/core";
import { ButtonBlue, ButtonPink } from "../../styles/others";
import { TitleDialog } from "../../styles/typography";
import {
  CloseButon,
  CommonDialogActions,
  CommonDialogContent,
  CommonDialogTitle,
} from "../../styles/dialogs";

const useStyles = makeStyles((theme) => ({
  btnSubmit: { width: "60%" },
  btnClose: { width: "40%" },
  dialogContent: { paddingTop: 0 },
}));

export const TaxExpTypeDialog = ({
  isOpen,
  handleClose,
  title,
  children,
  onSubmit,
  nameBtn,
}) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            boxShadow: "0px 3px 23px #00000033",
            borderRadius: 17,
            width: "23%",
          },
        }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <CommonDialogTitle id="max-width-dialog-title">
          <TitleDialog>{title}</TitleDialog>
          <CloseButon onClick={handleClose}>
            <i className="uil uil-times-circle" style={{ fontSize: "1.5vw" }} />
          </CloseButon>
        </CommonDialogTitle>
        <CommonDialogContent dividers>
          <div className={classes.dialogContent}>{children}</div>
        </CommonDialogContent>
        <CommonDialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{ textAlign: "end" }}>
              <ButtonBlue className={classes.btnSubmit} onClick={onSubmit}>
                {nameBtn}
              </ButtonBlue>
            </Grid>
            <Grid item xs={6}>
              <ButtonPink onClick={handleClose} className={classes.btnClose}>
                Annuler
              </ButtonPink>
            </Grid>
          </Grid>
        </CommonDialogActions>
      </Dialog>
    </>
  );
};
