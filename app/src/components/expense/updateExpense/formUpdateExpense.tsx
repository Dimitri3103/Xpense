import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextGrid } from "../../../styles/typography";
import ReactHookFormSelect from "../../ReactHookFormSelect";
import {
  BootstrapInput,
  StyledDatePicker,
  StyledDivider,
} from "../../../styles/others";
import { Grid, IconButton, MenuItem } from "@material-ui/core";
import currency from "../../../models/currency";
import { getCurrencies } from "../../../services-back/resourceService";
import formAddStyle from "../../../styles/components/formAddExpense";

export const FormUpdateExpense = (props) => {
  const { handleUpdateExpense, rowExpense, expenseTypes, taxes } = props;

  const classes = formAddStyle();

  const onSubmit = (data) => {
    handleUpdateExpense(data);
  };

  const { register, handleSubmit, control } = useForm();

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
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <TextGrid>Libellé</TextGrid>
                <BootstrapInput
                  id="label"
                  name="label"
                  inputRef={register({ required: true })}
                  className={classes.inputForm}
                  defaultValue={rowExpense.label}
                />
                <TextGrid>Type de dépense</TextGrid>
                <ReactHookFormSelect
                  className={classes.inputForm}
                  id="type"
                  name="type"
                  control={control}
                  defaultValue={rowExpense.type}
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
              <Grid item xs={3}>
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
                  defaultValue={rowExpense.date}
                  control={control}
                  name="date"
                />
                <TextGrid>Catégorie</TextGrid>
                <ReactHookFormSelect
                  className={classes.inputForm}
                  defaultValue={rowExpense.category}
                  id="category"
                  name="category"
                  control={control}
                >
                  <MenuItem disabled value="">
                    Choisir une catégorie
                  </MenuItem>
                  <MenuItem value="travel">Voyage</MenuItem>
                  <MenuItem value="meal">Repas</MenuItem>
                </ReactHookFormSelect>
              </Grid>
              <Grid item xs={3}>
                <TextGrid>Mode de paiement</TextGrid>
                <ReactHookFormSelect
                  className={classes.inputForm}
                  defaultValue={rowExpense.payMethod}
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
                  defaultValue={rowExpense.currency}
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
              <Grid item xs={3}>
                <div>
                  {rowExpense.attachments.map((attachment) => (
                    <div key={attachment.name}>
                      <img
                        src={require(`../../../../../api/public/files/${attachment.name}`)}
                        alt=""
                        className={classes.imgPreview}
                      />
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>

            <StyledDivider style={{ margin: "15px 0px 15px 0px" }} />

            <Grid container spacing={1}>
              <Grid item container direction="column" xs={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextGrid>Taxe</TextGrid>
                  </Grid>
                  <Grid item xs={4}>
                    <TextGrid>Montant</TextGrid>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <ReactHookFormSelect
                      className={classes.inputForm}
                      defaultValue={rowExpense.tax}
                      id="tax"
                      name="tax"
                      control={control}
                    >
                      <MenuItem disabled value="">
                        Choisir une taxe
                      </MenuItem>
                      {taxes.map((tax) => (
                        <MenuItem key={tax.id} value={tax.id}>
                          {tax.i18n}
                        </MenuItem>
                      ))}
                    </ReactHookFormSelect>
                  </Grid>
                  <Grid item xs={4}>
                    <BootstrapInput
                      name="taxAmount"
                      id="taxAmount"
                      inputRef={register({ required: true })}
                      defaultValue={rowExpense.taxAmount}
                      className={classes.inputAmount}
                    />
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
                  defaultValue={rowExpense.amount}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
