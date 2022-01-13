import { makeStyles } from "@material-ui/core";

const sideBar = makeStyles((theme) => ({
  sideBar: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 1px 8px #00000008",
    borderRadius: 17,
    width: "85%",
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(1),
    height: "87vh",
  },
  grow: { flexGrow: 1 },
  signOutItem: {
    font: "normal normal 600 1vw Open Sans",
    color: "#9BABC5",
    "& .MuiSvgIcon-root": { color: "#9BABC5" },
  },
}));

export default sideBar;
