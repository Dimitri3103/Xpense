import { makeStyles } from "@material-ui/core";

const tabExpensesList = makeStyles((theme) => ({
  statusNew: {
    background: "#2F45C5 0% 0% no-repeat padding-box",
    width: "6vw",
  },
  statusPending: {
    background: "#FFD741 0% 0% no-repeat padding-box",
    width: "6vw",
  },
  statusApproved: {
    background: "#38D643 0% 0% no-repeat padding-box",
    width: "4vw",
  },
  statusDeclined: {
    background: "#FC7070 0% 0% no-repeat padding-box",
    width: "4vw",
  },
  sheetCard: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 1px 3px #0000000F",
    borderRadius: 16,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  labelSheet: { font: "normal normal bold 1vw COCOGOOSE", color: "#07114B" },
  cardHeader: { height: "30%" },
  cardContent: { paddingRight: 0, paddingTop: 0 },
  menu: {
    marginTop: 40,
    [theme.breakpoints.up("sm")]: { marginTop: 28 },
  },
}));

export default tabExpensesList;
