import { makeStyles } from "@material-ui/core";

const inviteTeamMembers = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  boxContent: {
    width: 600,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  personAddBox: {
    color: "#2F45C5",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(2),
    borderRadius: 10,
    marginBottom: theme.spacing(2),
    width: "10%",
    margin: "auto",
  },
  invitation: {
    font: "normal normal 800 2vw Open Sans",
    color: "#07114B",
    textAlign: "center",
  },
  slogan: {
    font: "normal normal normal 1.5vw Open Sans",
    color: "#9BABC5",
    textAlign: "center",
  },
  btnInv: { width: "40%" },
  btnAddFields: { width: "100%"},
  inputEmail: { width: "100%", font: "normal normal normal 0.9vw Open Sans" },
  selectRole: { width: "100%", font: "normal normal normal 0.9vw Open Sans" },
  form: { width: "100%" },
}));

export default inviteTeamMembers;
