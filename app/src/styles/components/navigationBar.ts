import { makeStyles } from "@material-ui/core";

const navigationBar = makeStyles((theme) => ({
  grow: { flexGrow: 1 },
  appBar: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 8px #00000008",
  },
  title: {
    font: "normal normal normal 2vw COCOGOOSE",
    color: "#07114B",
    textDecoration: "none",
    "&:hover": { color: "#07114B", textDecoration: "none" },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: { display: "flex" },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: { display: "none" },
  },
  avatarImg: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    boxShadow: "0px 3px 6px #00000029",
  },
  search: {
    position: "relative",
    borderRadius: 30,
    boxShadow: "0px 1px 3px #0000000F",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2F45C5",
    fontSize: "1.2vw",
    zIndex: 1,
  },
  inputRoot: { font: "normal normal normal 1vw Open Sans", color: "#9BABC5" },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: { width: 300 },
    boxShadow: "0px 1px 3px #0000000F",
    borderRadius: 30,
  },
  btnNotif: {
    background: "#FB2B76 0% 0% no-repeat padding-box",
    font: "normal normal normal 1vw Open Sans",
    color: "#FFFFFF",
    textTransform: "none",
    width: 100,
    borderRadius: 30,
    "&:hover": { background: "#FB2B76 0% 0% no-repeat padding-box" },
  },
  menuNotif: { marginTop: 30, "& .MuiMenu-paper": { width: 250, padding: 0 } },
}));

export default navigationBar;
