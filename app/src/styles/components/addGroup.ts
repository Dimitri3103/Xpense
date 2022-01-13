import { makeStyles } from "@material-ui/core";

const addGroup = makeStyles((theme) => ({
  inputGroup: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.75),
    font: "normal normal 600 0.9vw Open Sans",
  },
  btnAddGroup: { width: "60%" },
  btnClose: { width: "60%" },
  btnAddField: { width: "50%" },
}));

export default addGroup;
