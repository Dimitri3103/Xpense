import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { TextDialog } from "../../styles/typography";
import { useForm } from "react-hook-form";
import { BootstrapInput } from "../../styles/others";

const useStyles = makeStyles((theme) => ({
  inputForm: { width: "100%", font: "normal normal normal 0.8vw Open Sans" },
}));

export const TaxForm = (props) => {
  const { fields, handleChangeField } = props;
  const classes = useStyles();
  const { register } = useForm();

  return (
    <div>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <TextDialog>Code</TextDialog>
        </Grid>
        <Grid item xs={9}>
          <BootstrapInput
            name="code"
            className={classes.inputForm}
            value={fields.code}
            inputRef={register({ required: true })}
            onChange={(event) => handleChangeField("code", event)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <TextDialog>Nom</TextDialog>
        </Grid>
        <Grid item xs={9}>
          <BootstrapInput
            name="i18n"
            className={classes.inputForm}
            inputRef={register({ required: true })}
            value={fields.i18n}
            onChange={(event) => handleChangeField("i18n", event)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <TextDialog>Taux</TextDialog>
        </Grid>
        <Grid item xs={9}>
          <BootstrapInput
            name="defaultRate"
            className={classes.inputForm}
            inputRef={register({ required: true })}
            value={fields.defaultRate}
            onChange={(event) => handleChangeField("defaultRate", event)}
          />
        </Grid>
      </Grid>
    </div>
  );
};
