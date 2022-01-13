import { makeStyles } from "@material-ui/core";

const chartExpense = makeStyles((theme) => ({
  gridChart: { marginTop: theme.spacing(2) },
  chart: { width: "95%", height: "115%" },
  pending: { width: "100%", height: "115%" },
  gridChartHead: { height: "14%" },
  textChart: {
    paddingLeft: theme.spacing(1),
    font: "normal normal bold 1.1vw Open Sans",
    color: "#07114B",
  },
  gridChartBody: { height: "10%" },
  gridChartContent: { height: "60%" },
  ColDate: {
    font: "normal normal bold 1vw Open Sans",
    color: "#9BABC5",
    marginLeft: theme.spacing(0.5),
  },
  moreText: {
    font: "normal normal normal 1.2vw Tajawal",
    color: "#FB2B76",
    cursor: "pointer",
    padding: theme.spacing(0.5),
    [theme.breakpoints.up("md")]: { padding: theme.spacing(1) },
  },
}));

export default chartExpense;
