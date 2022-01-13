import { makeStyles } from "@material-ui/core";

const inviteCollaboratorsGroup = makeStyles((theme) => ({
  content: { width: "100%", padding: theme.spacing(1) },
  searchBar: {
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    textAlign: "center",
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  btnAdd: {
    font: "normal normal normal 0.8vw Open Sans",
    width: "50%",
  },
  dialogContent: { padding: 0, width: "100%" },
}));

export default inviteCollaboratorsGroup;
