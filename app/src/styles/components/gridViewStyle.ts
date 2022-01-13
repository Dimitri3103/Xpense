import { makeStyles } from "@material-ui/core";

const gridViewStyle = makeStyles((theme) => ({
  menu: {
    marginTop: 38,
    [theme.breakpoints.up("sm")]: { marginTop: 28 },
  },
  styledBadge: {
    "& .MuiBadge-badge": { backgroundColor: "#44b700", color: "#44b700" },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
  },
  imgUser: {
    [theme.breakpoints.up("sm")]: {
      marginTop: 0,
      marginLeft: 0,
      marginRight: theme.spacing(0.5),
    },
  },
  itemAvatar: { margin: "0 auto" },
  itemBtnAction: {
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: { margin: 0 },
  },
  imageInvitation: {
    [theme.breakpoints.up("sm")]: { marginTop: 0, marginLeft: 0 },
  },
  styledBadgeInvitation: {
    "& .MuiBadge-badge": { backgroundColor: "#FFAA00", color: "#FFAA00" },
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5),
    },
  },
  stateInvitation: {
    font: "normal normal normal 0.7vw Open Sans",
    color: "#FFAA00",
    position: "absolute",
    top: "55%",
    right: "40%",
    [theme.breakpoints.up("sm")]: { top: "5%", right: "12%" },
  },
}));

export default gridViewStyle;
