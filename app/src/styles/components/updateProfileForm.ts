import { makeStyles } from "@material-ui/core";

const updateProfileForm = makeStyles((theme) => ({
  inputForm: { width: "100%" },
  btnUpdate: { width: "100%", borderRadius: 10 },
  sendIcon: { marginLeft: theme.spacing(3), fontSize: "1.5vw" },
}));

export default updateProfileForm;
