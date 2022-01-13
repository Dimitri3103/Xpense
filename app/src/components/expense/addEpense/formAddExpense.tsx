import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextDialog, TextGrid } from "../../../styles/typography";
import ReactHookFormSelect from "../../ReactHookFormSelect";
import {
  BootstrapInput,
  ButtonDashed,
  StyledDatePicker,
  StyledDivider,
} from "../../../styles/others";
import { Button, Grid, IconButton, MenuItem } from "@material-ui/core";
import currency from "../../../models/currency";
import { getCurrencies } from "../../../services-back/resourceService";

export const FormAddExpense = (props) => {
  const { classes, onSubmit, expenseTypes, taxes } = props;
  const { register, handleSubmit, control } = useForm();

  const [fields, setFields] = React.useState([{ tax: "", taxAmount: "" }]);

  const handleChange = (index, event) => {
    const newFields = [...fields];
    newFields[index][event.target.name] = event.target.value;
    setFields(newFields);
  };
  const handleAddFields = () => {
    setFields([...fields, { tax: "", taxAmount: "" }]);
  };
  const handleRemoveFields = (index) => {
    const values = [...fields];
    values.splice(index, 1);
    setFields(values);
  };

  const [currencies, setCurrencies] = React.useState([]);
  if (currencies.length == 0) {
    getCurrencies()
      .then((data: currency[]) => {
        const result = [];
        data.forEach((c) => result.push({ label: c.nameFR, value: c.code }));
        return result;
      })
      .then(setCurrencies);
  }

  return (
    <div>
      <TextDialog>Ajouter une nouvelle dépense</TextDialog>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextGrid>Libellé</TextGrid>
                <BootstrapInput
                  id="label"
                  name="label"
                  inputRef={register({ required: true })}
                  className={classes.inputForm}
                />
                <TextGrid>Type de dépense</TextGrid>
                <ReactHookFormSelect
                  className={classes.inputForm}
                  defaultValue=""
                  id="type"
                  name="type"
                  control={control}
                >
                  <MenuItem disabled value="">
                    Choisir un type de dépense
                  </MenuItem>
                  {expenseTypes.map((expt) => (
                    <MenuItem key={expt.id} value={expt.id}>
                      {expt.i18n}
                    </MenuItem>
                  ))}
                </ReactHookFormSelect>
              </Grid>
              <Grid item xs={4}>
                <TextGrid>Date de dépense</TextGrid>
                <Controller
                  render={({ onChange, value }) => (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <StyledDatePicker
                        autoOk
                        animateYearScrolling
                        value={value}
                        onChange={onChange}
                        format="MM/dd/yyyy"
                        id="date"
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <IconButton size="small">
                              <i
                                className="uil uil-calender"
                                style={{ fontSize: "1.2vw", color: "#9BABC5" }}
                              />
                            </IconButton>
                          ),
                          className: classes.fontForm,
                        }}
                        className={classes.inputForm}
                      />
                    </MuiPickersUtilsProvider>
                  )}
                  defaultValue={new Date()}
                  control={control}
                  name="date"
                />
                <TextGrid>Catégorie</TextGrid>
                <ReactHookFormSelect
                  className={classes.inputForm}
                  defaultValue=""
                  id="category"
                  name="category"
                  control={control}
                >
                  <MenuItem disabled value="">
                    Choisir une catégorie
                  </MenuItem>
                  <MenuItem value="transport">Transport</MenuItem>
                  <MenuItem value="meal">Repas</MenuItem>
                </ReactHookFormSelect>
              </Grid>
              <Grid item xs={4}>
                <TextGrid>Mode de paiement</TextGrid>
                <ReactHookFormSelect
                  className={classes.inputForm}
                  defaultValue=""
                  id="payMethod"
                  name="payMethod"
                  control={control}
                >
                  <MenuItem disabled value="">
                    Choisir un mode de paiement
                  </MenuItem>
                  <MenuItem value="check">Chèque</MenuItem>
                  <MenuItem value="cash">Espèce</MenuItem>
                  <MenuItem value="card">Carte</MenuItem>
                </ReactHookFormSelect>
                <TextGrid>Devise</TextGrid>
                <ReactHookFormSelect
                  className={classes.inputForm}
                  defaultValue=""
                  id="currency"
                  name="currency"
                  control={control}
                >
                  <MenuItem disabled value="">
                    Choisir une devise
                  </MenuItem>
                  {currencies.map((currency) => (
                    <MenuItem key={currency.label} value={currency.value}>
                      {currency.label}
                    </MenuItem>
                  ))}
                </ReactHookFormSelect>
              </Grid>
            </Grid>

            <StyledDivider style={{ margin: "15px 0px 15px 0px" }} />

            <Grid container spacing={1}>
              <Grid item container direction="column" xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextGrid>Taxes</TextGrid>
                  </Grid>
                  <Grid item xs={4}>
                    <TextGrid>Montant</TextGrid>
                  </Grid>
                </Grid>
                {fields.map((field, index) => (
                  <div key={index}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <ReactHookFormSelect
                          className={classes.inputForm}
                          defaultValue=""
                          id="tax"
                          name="tax"
                          control={control}
                          value={field.tax}
                          onChange={(event) => handleChange(index, event)}
                        >
                          <MenuItem disabled value="">
                            Choisir une taxe
                          </MenuItem>
                          {taxes.map((tax) => (
                            <MenuItem key={tax.id} value={tax.id}>
                              {tax.i18n} - {tax.code}
                            </MenuItem>
                          ))}
                        </ReactHookFormSelect>
                      </Grid>
                      <Grid item xs={4}>
                        <BootstrapInput
                          name="taxAmount"
                          id="taxAmount"
                          value={field.taxAmount}
                          onChange={(event) => handleChange(index, event)}
                          inputRef={register({ required: true })}
                          className={classes.inputAmount}
                        />
                      </Grid>
                      {fields.length === 1 ? null : (
                        <IconButton onClick={() => handleRemoveFields(index)}>
                          <i
                            className="uil uil-times"
                            style={{ fontSize: "1.5vw" }}
                          />
                        </IconButton>
                      )}
                    </Grid>
                  </div>
                ))}
                <Grid container>
                  <Grid item xs={6}>
                    <ButtonDashed
                      className={classes.btnAddFields}
                      onClick={handleAddFields}
                    >
                      + Ajouter plus
                    </ButtonDashed>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4} container direction="column">
                <span className={classes.total}>Montant Total</span>
                <BootstrapInput
                  id="amount"
                  name="amount"
                  className={classes.inputTotal}
                  inputRef={register({ required: true })}
                />

                <Button
                  className={classes.btnAddFees}
                  onClick={handleSubmit(onSubmit)}
                >
                  Ajouter la dépense
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
