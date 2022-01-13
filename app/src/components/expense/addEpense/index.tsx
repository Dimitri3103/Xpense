import React from "react";
import { Grid } from "@material-ui/core";
import Router from "next/router";
import formAddStyle from "../../../styles/components/formAddExpense";
import { FormAddExpense } from "./formAddExpense";
import { StyledDivider, ButtonBlue, ButtonPink } from "../../../styles/others";

export const AddExpense = (props) => {
  const { expenseTypes, taxes, handleAddExpense, routeAdd, handleSaveSheet } =
    props;
  const classes = formAddStyle();

  const onSubmit = (data) => {
    handleAddExpense(data);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <FormAddExpense
        classes={classes}
        onSubmit={onSubmit}
        expenseTypes={expenseTypes}
        taxes={taxes}
      />
      <StyledDivider style={{ margin: "10px 0px 5px 0px" }} />
      <Grid container>
        <Grid item xs={12} style={{ textAlign: "end" }}>
          <ButtonBlue className={classes.btnSave} onClick={handleSaveSheet}>
            Sauvegarder
          </ButtonBlue>
          <ButtonPink
            className={classes.btnCancel}
            onClick={() => Router.push(routeAdd)}
          >
            Annuler
          </ButtonPink>
        </Grid>
      </Grid>
    </div>
  );
};
