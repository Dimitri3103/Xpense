import { CircularProgress, Grid } from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import currency from "../../models/currency";
import { getCurrencies } from "../../services-back/resourceService";
import updateProfileForm from "../../styles/components/updateProfileForm";
import { TextGrid } from "../../styles/typography";
import { AlertBar } from "../Notification";
import { BootstrapInput, ButtonBlue } from "../../styles/others";
import Org from "../../models/org";
import { updateOrg } from "../../services-back/admin/orgService";

export const UpdateOrgForm = (org: Org) => {
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
    updateOrg(org.id, values)
      .then(() => {
        setLoading(false);
        showAlert("success", "Paramètres de l'organisation mis à jour");
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
    name: org.name,
    nameAdmin: org.contact.name,
    address: org.address,
    emailAdmin: org.contact.email,
    phoneAdmin: org.contact.phone,
  });

  const handleChange = (value, event) => {
    setValues({
      ...values,
      [value]: event.target.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginLeft: 40 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextGrid>Nom de l'organisation</TextGrid>
            <BootstrapInput
              id="name"
              name="name"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.name}
              onChange={(event) => handleChange("name", event)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextGrid>Adresse de l'organisation</TextGrid>
            <BootstrapInput
              id="address"
              name="address"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.address}
              onChange={(event) => handleChange("address", event)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextGrid>Email de l'administrateur</TextGrid>
            <BootstrapInput
              id="emailAdmin"
              name="emailAdmin"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.emailAdmin}
              onChange={(event) => handleChange("emailAdmin", event)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextGrid>Nom de l'administrateur</TextGrid>
            <BootstrapInput
              id="nameAdmin"
              name="nameAdmin"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.nameAdmin}
              onChange={(event) => handleChange("nameAdmin", event)}
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextGrid>Numéro de téléphone de l'administrateur</TextGrid>
            <BootstrapInput
              id="phoneAdmin"
              name="phoneAdmin"
              className={classes.inputForm}
              inputRef={register({ required: true })}
              value={values.phoneAdmin}
              onChange={(event) => handleChange("phoneAdmin", event)}
            />
          </Grid>
        </Grid>
        <br />
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
