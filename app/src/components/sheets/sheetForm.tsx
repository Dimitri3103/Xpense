import { Grid, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { BootstrapInput } from "../../styles/others";
import { TextDialog } from "../../styles/typography";

const useStyles = makeStyles((theme) => ({
  inputForm: { width: "100%", font: "normal normal normal 0.8vw Open Sans" },
}));

export const SheetForm = (props) => {
  const { fields, handleChangeField } = props;
  const classes = useStyles();
  const { register } = useForm();

  return (
    <div>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={3}>
          <TextDialog>Libellé</TextDialog>
        </Grid>
        <Grid item xs={9}>
          <BootstrapInput
            name="label"
            className={classes.inputForm}
            value={fields.label}
            inputRef={register({ required: true })}
            onChange={(event) => handleChangeField("label", event)}
          />
        </Grid>
        <Grid item xs={3}>
          <TextDialog>Description</TextDialog>
        </Grid>
        <Grid item xs={9}>
          <BootstrapInput
            name="description"
            multiline
            rows={3}
            className={classes.inputForm}
            value={fields.description}
            inputRef={register({ required: true })}
            onChange={(event) => handleChangeField("description", event)}
          />
        </Grid>
      </Grid>
    </div>
  );
};
