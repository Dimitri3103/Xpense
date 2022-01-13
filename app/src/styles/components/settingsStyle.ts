import { makeStyles } from "@material-ui/core";

const settingsStyle = makeStyles((theme) => ({
  nameBox: { display: "flex" },
  name: {
    font: "normal normal 600 1.2vw Open Sans",
    color: "#FB2B76",
    marginRight: theme.spacing(1),
  },
  greyText: { font: "normal normal normal 1vw Open Sans", color: "#9BABC5" },
  root: { display: "flex", height: "75vh", marginTop: theme.spacing(1) },
  nameTab: {
    font: "normal normal 600 1.2vw Open Sans",
    color: "#07114B",
    marginLeft: theme.spacing(1),
  },
}));

export default settingsStyle;
