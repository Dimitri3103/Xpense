import { makeStyles } from "@material-ui/core";

const formDetailsExpense = makeStyles((theme) => ({
  uploadPart: { width: "100%", height: "100%", position: "relative" },
  btnCancel: { marginLeft: theme.spacing(1), width: "10%" },
  btnConfirm: { width: "10%" },
  pinkText: { font: "normal normal 600 1vw Open Sans", color: "#FB2B76" },
  itemAmount: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 6px #00000005",
    borderRadius: 10,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
  amount: {
    background: "#2F45C51A 0% 0% no-repeat padding-box",
    borderRadius: "50%",
  },
  imgReceipt: {
    width: "140%",
    height: "100%",
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(1.5) },
    [theme.breakpoints.up("md")]: { marginLeft: theme.spacing(2.5) },
    [theme.breakpoints.up("lg")]: { marginLeft: theme.spacing(3) },
  },
  avatarZoom: {
    boxShadow: "0px 2px 3px #0000001A",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    color: "#2F45C5",
    position: "absolute",
    top: 0,
    left: theme.spacing(1),
    width: 15,
    height: 15,
    "&:hover": {
      background: "#2F45C5 0% 0% no-repeat padding-box",
      color: "#ffffff",
    },
    [theme.breakpoints.up("sm")]: { left: theme.spacing(1.5) },
    [theme.breakpoints.up("md")]: {
      left: theme.spacing(2.5),
      width: 25,
      height: 25,
    },
    [theme.breakpoints.up("lg")]: { left: theme.spacing(2.75) },
  },
  avatarClose: {
    boxShadow: "0px 2px 3px #0000001A",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    color: "#2F45C5",
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    "&:hover": {
      background: "#2F45C5 0% 0% no-repeat padding-box",
      color: "#ffffff",
    },
    [theme.breakpoints.up("sm")]: {
      width: 25,
      height: 25,
    },
  },
  imgZoom: {
    width: 200,
    height: 200,
    [theme.breakpoints.up("sm")]: { width: 300, height: 300 },
    [theme.breakpoints.up("md")]: { width: 400, height: 400 },
    [theme.breakpoints.up("xl")]: { width: 600, height: 600 },
  },
}));

export default formDetailsExpense;
