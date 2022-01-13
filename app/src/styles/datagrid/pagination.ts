import { makeStyles } from "@material-ui/core";

export const styledPagination = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .Mui-disabled": { opacity: 0 },
    "& .Mui-selected, .Mui-selected:hover": {
      backgroundColor: "#2F45C5",
      color: "#fff",
      fontWeight: "bold",
    },
    "& ul > li:not(:first-child):not(:last-child) > button:not(.Mui-selected)":
      {
        color: "#07114B",
        fontWeight: "bold",
      },
  },
}));
