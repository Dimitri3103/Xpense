import { FormControlLabel, Grid, makeStyles, Switch } from "@material-ui/core";
import React from "react";
import { TextDialog } from "../../styles/typography";
import { useForm } from "react-hook-form";
import {
  BootstrapInput,
  MenuItemCRuD,
  SelectIcon,
  StyledSelect,
} from "../../styles/others";

const useStyles = makeStyles((theme) => ({
  selectForm: { width: "100%" },
  inputForm: { width: "100%", font: "normal normal normal 0.8vw Open Sans" },
  formControlLabel: {
    paddingLeft: theme.spacing(1),
    "& .MuiFormControlLabel-label": {
      color: "#07114B",
      font: "normal normal normal 0.9vw Open Sans",
    },
  },
}));

export const ExpenseTypeForm = (props) => {
  const { fields, handleChangeField, handleChangeSwitch } = props;
  const classes = useStyles();
  const { register } = useForm();
  const options = [
    {
      label: "Simple",
      value: "simple",
    },
    {
      label: "Complexe",
      value: "complex",
    },
  ];

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
          <TextDialog>Type</TextDialog>
        </Grid>
        <Grid item xs={9}>
          <StyledSelect
            IconComponent={SelectIcon}
            disableUnderline
            displayEmpty
            className={classes.selectForm}
            name="type"
            value={fields.type}
            onChange={(event) => handleChangeField("type", event)}
          >
            <MenuItemCRuD disabled value="">
              Choisir un type
            </MenuItemCRuD>
            {options.map((option) => (
              <MenuItemCRuD key={option.label} value={option.value}>
                {option.label}
              </MenuItemCRuD>
            ))}
          </StyledSelect>
        </Grid>
      </Grid>

      {fields.type === "complex" ? (
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={3}>
            <TextDialog>Formule</TextDialog>
          </Grid>
          <Grid item xs={9}>
            <BootstrapInput
              name="multiplicator"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={fields.multiplicator}
              onChange={(event) => handleChangeField("multiplicator", event)}
            />
          </Grid>
        </Grid>
      ) : null}

      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <TextDialog>Statut</TextDialog>
        </Grid>
        <Grid item xs={9}>
          <StyledSelect
            IconComponent={SelectIcon}
            displayEmpty
            disableUnderline
            className={classes.selectForm}
            name="status"
            value={fields.status}
            onChange={(event) => handleChangeField("status", event)}
          >
            <MenuItemCRuD disabled value="">
              Choisir un statut
            </MenuItemCRuD>
            <MenuItemCRuD value="active">Actif</MenuItemCRuD>
            <MenuItemCRuD value="archived">Archivé</MenuItemCRuD>
          </StyledSelect>
        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <TextDialog>Justificatif</TextDialog>
        </Grid>
        <Grid item xs={9}>
          <FormControlLabel
            control={
              <Switch
                checked={fields.attachmentRequired}
                onChange={handleChangeSwitch}
                name="attachmentRequired"
                size="small"
              />
            }
            label="Requis"
            className={classes.formControlLabel}
          />
        </Grid>
      </Grid>
    </div>
  );
};
