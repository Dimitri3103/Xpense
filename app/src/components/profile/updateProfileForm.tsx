import { CircularProgress, Grid } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import currency from "../../models/currency";
import User from "../../models/user";
import { updateProfile } from "../../services-back/profileService";
import { getCurrencies } from "../../services-back/resourceService";
import updateProfileForm from "../../styles/components/updateProfileForm";
import { TextGrid } from "../../styles/typography";
import { AlertBar } from "../Notification";
import {
  BootstrapInput,
  ButtonBlue,
  MenuItemCRuD,
  SelectIcon,
  StyledSelect,
} from "../../styles/others";

export const UpdateProfileForm = (user: User) => {
  const classes = updateProfileForm();
  const [loading, setLoading] = useState(false);

  const [currencies, setCurrencies] = useState([]);
  if (currencies.length == 0) {
    getCurrencies()
      .then((data: currency[]) => {
        const result = [];
        data.forEach((c) => result.push({ label: c.nameFR, value: c.code }));
        return result;
      })
      .then(setCurrencies);
  }
  const { register, handleSubmit, setError } = useForm();

  const [alertMeta, setAlertMeta] = useState({ severity: "", message: "" });
  const [isAlertOpen, setAlertOpen] = useState(false);

  const showAlert = (severity, message) => {
    setAlertMeta({ severity, message });
    setAlertOpen(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const handleServerValidationError = (error) => {
    Object.entries(error).forEach(
      ([key, val]: [string, { constraints: string[] }]) => {
        setError(key, {
          type: "server",
          message: val.constraints.join(" "),
        });
      }
    );
  };
  const onSubmit = () => {
    setLoading(true);
    updateProfile(values)
      .then(() => {
        setLoading(false);
        showAlert("success", "Profil mis à jour");
      })
      .catch((e) => {
        setLoading(false);
        if (e == 400) {
          handleServerValidationError(e.response.data.errors);
          showAlert("error", "BadRequestError");
        } else {
          showAlert("error", "Error");
        }
      });
  };

  const [values, setValues] = useState({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
    defaultCurrency: user.defaultCurrency,
    language: user.language,
  });

  const handleChange = (value, event) => {
    setValues({
      ...values,
      [value]: event.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextGrid>Email</TextGrid>
            <BootstrapInput
              id="email"
              placeholder="Email"
              name="email"
              inputProps={{
                readOnly: true,
              }}
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.email}
              onChange={(event) => handleChange("email", event)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextGrid>Pseudo</TextGrid>
            <BootstrapInput
              id="displayName"
              placeholder="Pseudo"
              name="displayName"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.displayName}
              onChange={(event) => handleChange("displayName", event)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextGrid>Prénom</TextGrid>
            <BootstrapInput
              id="firstName"
              placeholder="Prénom"
              name="firstName"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.firstName}
              onChange={(event) => handleChange("firstName", event)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextGrid>Nom</TextGrid>
            <BootstrapInput
              id="lastName"
              placeholder="Nom"
              name="lastName"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.lastName}
              onChange={(event) => handleChange("lastName", event)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextGrid>Numéro de téléphone</TextGrid>
            <BootstrapInput
              id="phoneNumber"
              placeholder="Numéro de téléphone"
              name="phoneNumber"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.phoneNumber}
              onChange={(event) => handleChange("phoneNumber", event)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextGrid>Devise</TextGrid>
            <StyledSelect
              IconComponent={SelectIcon}
              displayEmpty
              disableUnderline
              className={classes.inputForm}
              name="defaultCurrency"
              value={values.defaultCurrency}
              onChange={(event) => handleChange("defaultCurrency", event)}
            >
              {currencies.map((currency) => (
                <MenuItemCRuD key={currency.label} value={currency.value}>
                  {currency.label}
                </MenuItemCRuD>
              ))}
            </StyledSelect>
          </Grid>
          <Grid item xs={4}>
            <TextGrid>Langue</TextGrid>
            <StyledSelect
              IconComponent={SelectIcon}
              displayEmpty
              disableUnderline
              className={classes.inputForm}
              name="language"
              value={values.language}
              onChange={(event) => handleChange("language", event)}
            >
              <MenuItemCRuD key={"FR"} value={"FR"}>
                Français
              </MenuItemCRuD>
              <MenuItemCRuD key={"EN"} value={"EN"}>
                Anglais
              </MenuItemCRuD>
            </StyledSelect>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ButtonBlue
              type="submit"
              disabled={loading}
              className={classes.btnUpdate}
            >
              {loading && <CircularProgress size={20} />}
              Sauvegarder{" "}
              <div className={classes.sendIcon}>
                <i className="uil uil-message" />
              </div>
            </ButtonBlue>
          </Grid>
        </Grid>
      </form>

      <AlertBar
        open={isAlertOpen}
        onClose={handleAlertClose}
        alertMeta={alertMeta}
      />
    </>
  );
};
