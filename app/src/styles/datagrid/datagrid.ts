import { makeStyles } from "@material-ui/core";

export const styleDataGrid = makeStyles((theme) => ({
  root: {
    borderStyle: "none",
    width: "100%",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 1px 8px #00000008",
    borderRadius: 17,
    WebkitFontSmoothing: "auto",
    letterSpacing: 0,
    marginTop: theme.spacing(0.5),
    "& .MuiDataGrid-iconSeparator": { display: "none" },
    "& .MuiDataGrid-colCellTitle": {
      font: "normal normal 600 0.9vw Open Sans",
      color: "#9BABC5",
    },
    "& .MuiDataGrid-cell": {
      font: "normal normal 600 0.9vw Open Sans",
      color: "#07114BC2",
      cursor: "pointer",
      borderBottom: "none",
    },
    "& .MuiDataGrid-cell:focus": { outline: 0 },
    "& .MuiDataGrid-colCell:focus, .MuiDataGrid-cell:focus-within": {
      outline: 0,
    },
    "& .MuiDataGrid-checkboxInput": {
      padding: theme.spacing(0.5),
      "& svg": { fontSize: "1.5vw", color: "#9BABC585" },
    },
  },
}));
