import React from "react";
import {
  Dialog,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import {
  CloseButon,
  CommonDialogActions,
  CommonDialogContent,
  CommonDialogTitle,
} from "../../../styles/dialogs";
import { TitleDialog } from "../../../styles/typography";
import { ButtonBlue, ButtonPink } from "../../../styles/others";
import { FormUpdateExpense } from "./formUpdateExpense";
import { updateExpense } from "../../../services-back/expenseService";

const useStyles = makeStyles((theme) => ({
  btnSubmit: { width: "60%" },
  btnClose: { width: "40%" },
}));

export const UpdateExpense = ({
  isOpen,
  handleClose,
  expense,
  sheetId,
  expenseTypes,
  taxes,
}) => {
  const classes = useStyles();
  const handleUpdateExpense = (exp) => {
    updateExpense(sheetId, expense.id, exp).then(() => handleClose());
  };

  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            boxShadow: "0px 3px 23px #00000033",
            borderRadius: 17,
            width: "60%",
          },
        }}
        open={isOpen}
        onClose={handleClose}
      >
        <CommonDialogTitle id="max-width-dialog-title">
          <TitleDialog>Modifier dépense</TitleDialog>
          <CloseButon onClick={handleClose}>
            <i className="uil uil-times-circle" style={{ fontSize: "1.5vw" }} />
          </CloseButon>
        </CommonDialogTitle>
        <CommonDialogContent dividers>
          {expense ? (
            <FormUpdateExpense
              handleUpdateExpense={handleUpdateExpense}
              rowExpense={expense}
              expenseTypes={expenseTypes}
              taxes={taxes}
            />
          ) : null}
        </CommonDialogContent>
        <CommonDialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{ textAlign: "end" }}>
              <ButtonBlue
                className={classes.btnSubmit}
                onClick={handleUpdateExpense}
              >
                Sauvegarder
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

UpdateExpense.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
