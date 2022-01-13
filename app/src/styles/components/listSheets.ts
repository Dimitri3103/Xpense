import { makeStyles } from "@material-ui/core";

const listSheets = makeStyles((theme) => ({
  inputSort: { width: "100%" },
  btnAddExpense: { width: "100%", height: "2vw" },
  separator: {
    content: "",
    display: "inline-block",
    background: "#fff",
    height: "2vw",
    width: 1,
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  datePicker: { width: "100%" },
  inputDatePicker: { font: "normal normal normal 0.8vw Open Sans" },
}));

export default listSheets;
