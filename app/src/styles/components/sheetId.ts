import { makeStyles } from "@material-ui/core";

const sheetId = makeStyles((theme) => ({
  btnCancel: {
    width: "60%",
    border: "1px solid #9BABC5",
    borderRadius: 30,
    font: "normal normal 600 1vw Open Sans",
    color: "#9BABC5",
    textTransform: "none",
  },
  ref: {
    padding: 0,
    textAlign: "left",
    font: "normal normal 800 1vw Open Sans",
    color: "#2F45C5",
  },
  nameUser: { font: "normal normal 600 0.7vw Open Sans", color: "#FB2B76" },
  picUser: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    [theme.breakpoints.up("xl")]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  },
}));

export default sheetId;
