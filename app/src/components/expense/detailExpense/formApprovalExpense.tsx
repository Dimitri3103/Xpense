import { Grid } from "@material-ui/core";
import React from "react";
import formDetailsExpense from "../../../styles/components/formDetailsExpense";
import { StyledDivider, ButtonBlue, ButtonPink } from "../../../styles/others";
import FormDetails from "./formDetailsExpense";

const FormApproval = (props: any) => {
  const {
    rowSelected,
    orgId,
    handleValidateSheet,
    handleRejectSheet,
    setConfirmDialog,
  } = props;
  const classes = formDetailsExpense();

  return (
    <div>
      <FormDetails rowSelected={rowSelected} orgId={orgId} />
      <StyledDivider style={{ marginTop: 10, marginBottom: 10 }} />
      <div>
        <Grid container>
          <Grid item xs={12} style={{ textAlign: "end" }}>
            <ButtonBlue
              className={classes.btnConfirm}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Êtes-vous sûr de vouloir valider cette note de frais ?",
                  subTitle: "Vous ne pouvez pas annuler cette opération !!!",
                  onConfirm: handleValidateSheet,
                });
              }}
            >
              Valider
            </ButtonBlue>

            <ButtonPink
              className={classes.btnCancel}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Êtes-vous sûr de vouloir rejeter cette note de frais ?",
                  subTitle: "Vous ne pouvez pas annuler cette opération !!!",
                  onConfirm: handleRejectSheet,
                });
              }}
            >
              Rejeter
            </ButtonPink>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default FormApproval;
