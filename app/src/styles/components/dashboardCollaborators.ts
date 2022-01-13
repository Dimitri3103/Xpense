import { makeStyles } from "@material-ui/core";

const dashboardCollaborators = makeStyles((theme) => ({
  btnAddMembers: { width: "100%" },
  members: {
    font: "normal normal 600 0.9vw Open Sans",
    color: " #9BABC599",
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
  paperMore: {
    width: "70%",
    height: "30%",
    font: "normal normal 600 1vw Open Sans",
    color: "#FB2B76",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 1px 3px #0000000F",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    [theme.breakpoints.up("sm")]: { height: "70%" },
  },
}));

export default dashboardCollaborators;
