// Global Style Of MUI Components
import {
  Avatar,
  Badge,
  Button,
  createStyles,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

export const BootstrapInput = withStyles((theme) =>
  createStyles({
    input: {
      borderRadius: 30,
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "1px 1px 3px #0000000F",
      border: "0.3px solid #0000000F",
      color: "#07114B",
      paddingLeft: theme.spacing(1),
      font: "normal normal normal 0.8vw Open Sans",
      "&:focus": { borderRadius: 30, boxShadow: "0px 1px 3px #0000000F" },
    },
  })
)(InputBase);
export const StyledTextField = withStyles((theme) =>
  createStyles({
    root: {
      borderRadius: 30,
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "1px 1px 3px #0000000F",
      border: "0.3px solid #0000000F",
      paddingLeft: theme.spacing(1),
      width: "90%",
    },
  })
)(TextField);
export const StyledSelect = withStyles((theme) =>
  createStyles({
    root: {
      borderRadius: 30,
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "1px 1px 3px #0000000F",
      border: "0.3px solid #0000000F",
      color: "#07114B",
      paddingLeft: theme.spacing(1),
      font: "normal normal normal 0.8vw Open Sans",
      "&:focus": { borderRadius: 30, boxShadow: "0px 1px 3px #0000000F" },
    },
  })
)(Select);
export const SelectIcon = withStyles((theme) =>
  createStyles({
    root: {
      color: "#9BABC5",
      fontSize: "2vw",
      position: "absolute",
      top: theme.spacing(0.5),
      right: 0,
      [theme.breakpoints.up("sm")]: { top: theme.spacing(0.4) },
      [theme.breakpoints.up("md")]: { top: theme.spacing(0.3) },
      [theme.breakpoints.up("lg")]: { top: theme.spacing(0.2) },
      [theme.breakpoints.up("xl")]: { top: 0 },
    },
  })
)(ExpandMoreIcon);
export const StyledDatePicker = withStyles((theme) =>
  createStyles({
    root: {
      borderRadius: 30,
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "1px 1px 3px #0000000F",
      border: "0.3px solid #0000000F",
      paddingLeft: theme.spacing(1),
    },
  })
)(DatePicker);
export const GridCard = withStyles((theme) =>
  createStyles({
    root: {
      display: "none",
      [theme.breakpoints.up("sm")]: { display: "block" },
    },
  })
)(Grid);
export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
  })
)(Badge);
export const StyledDivider = withStyles({
  root: { backgroundColor: "#E2E7EE" },
})(Divider);
export const AvatarUser = withStyles((theme) =>
  createStyles({
    root: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      },
      [theme.breakpoints.up("md")]: {
        width: theme.spacing(6),
        height: theme.spacing(6),
      },
      [theme.breakpoints.up("lg")]: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      [theme.breakpoints.up("xl")]: {
        width: theme.spacing(8),
        height: theme.spacing(8),
      },
    },
  })
)(Avatar);
export const AvatarGroupUser = withStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAvatarGroup-avatar": {
        // background: "#D5DBFF 0% 0% no-repeat padding-box",
        border: "2px solid #FFFFFF",
        font: "normal normal 600 1vw Open Sans",
        letterSpacing: 0,
        // color: "#2F45C5",
        width: theme.spacing(2),
        height: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(3),
          height: theme.spacing(3),
        },
        [theme.breakpoints.up("md")]: {
          width: theme.spacing(3.5),
          height: theme.spacing(3.5),
        },
        [theme.breakpoints.up("lg")]: {
          width: theme.spacing(4.5),
          height: theme.spacing(4.5),
        },
        [theme.breakpoints.up("xl")]: {
          width: theme.spacing(5.5),
          height: theme.spacing(5.5),
        },
      },
    },
  })
)(AvatarGroup);
export const PaperList = withStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 1px 3px #0000000F",
      borderRadius: 16,
      width: "100%",
      height: "115%",
      padding: theme.spacing(0.25),
    },
  })
)(Paper);
export const PaperChart = withStyles((theme) =>
  createStyles({
    root: {
      position: "relative",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      boxShadow: "0px 1px 3px #0000000F",
      borderRadius: 16,
      width: "100%",
      height: "115%",
    },
  })
)(Paper);
export const MenuItemCRuD = withStyles({
  root: {
    font: "normal normal normal 0.9vw Open Sans",
    color: "#9BABC5",
    display: "flex",
    paddingBottom: 5,
    paddingTop: 5,
  },
})(MenuItem);
export const MenuNav = withStyles({
  paper: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 6px #00000014",
    border: "1px solid #E2E7EE",
    borderRadius: 8,
  },
})(Menu);
export const ChartTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#07114B",
      minHeight: 2,
      font: "normal normal normal 0.7vw Open Sans",
      "&$selected": {
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        borderRadius: 5,
        color: "#07114B",
      },
      padding: 0,
      maxWidth: "33%",
      minWidth: "33%",
      marginTop: theme.spacing(0.2),
      marginBottom: theme.spacing(0.2),
      [theme.breakpoints.up("sm")]: {
        minHeight: 4,
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(0.5),
      },
    },
    selected: {},
  })
)(Tab);
export const ChartTabs = withStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#F9FAFE 0% 0% no-repeat padding-box",
      borderRadius: 5,
      minHeight: 5,
      marginLeft: "auto",
      [theme.breakpoints.up("sm")]: {
        minHeight: 15,
      },
    },
  })
)(Tabs);
export const InvitationTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#9BABC5",
      minHeight: 30,
      font: "normal normal 600 0.9vw Open Sans",
      maxWidth: "50%",
      minWidth: "50%",
    },
  })
)(Tab);
export const InvitationTabs = withStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 20,
      width: "100%",
    },
  })
)(Tabs);
export const SettingsTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#9BABC5",
      font: "normal normal 600 1vw Open Sans",
      "&:hover": { color: "#07114B" },
      "&$selected": { color: "#07114B" },
    },
    selected: {},
    wrapper: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      width: "100%",
      flexDirection: "row",
    },
  })
)(Tab);
export const ViewTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "50%",
      minWidth: "50%",
      minHeight: 25,
      padding: theme.spacing(0),
      [theme.breakpoints.up("xs")]: {
        padding: theme.spacing(0),
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: "50%",
      },
      color: "#9BABC5",
      "&$selected": {
        color: "#2F45C5",
      },
    },
    selected: {},
  })
)(Tab);
export const ViewTabs = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      minHeight: 10,
      [theme.breakpoints.up("sm")]: {
        minHeight: 25,
      },
    },
  })
)(Tabs);
export const ButtonAction = withStyles((theme) =>
  createStyles({
    root: {
      boxShadow: "0px 2px 3px #0000001A",
      background: "#FFFFFF 0% 0% no-repeat padding-box",
      color: "#2F45C5",
      width: 10,
      height: 10,
      [theme.breakpoints.up("sm")]: { width: 15, height: 15 },
      [theme.breakpoints.up("md")]: { width: 20, height: 20 },
      [theme.breakpoints.up("lg")]: { width: 25, height: 25 },
      [theme.breakpoints.up("xl")]: { width: 35, height: 35 },
      "&:hover": {
        background: "#2F45C5 0% 0% no-repeat padding-box",
        color: "#ffffff",
      },
    },
  })
)(IconButton);
export const ButtonBlue = withStyles({
  root: {
    background: " #2F45C5 0% 0% no-repeat padding-box",
    borderRadius: 30,
    color: " #FFFFFF",
    font: "normal normal normal 1vw Open Sans",
    "&:hover": { background: "#2F45C5 0% 0% no-repeat padding-box" },
    textTransform: "none",
  },
})(Button);
export const ButtonDashed = withStyles({
  root: {
    border: "1px dashed #9BABC573",
    borderRadius: 30,
    font: "normal normal 600 0.9vw Open Sans",
    color: " #9BABC5",
    textTransform: "none",
    height: 25,
  },
})(Button);
export const ButtonPink = withStyles({
  root: {
    border: "1px solid #FB2B76",
    borderRadius: 30,
    color: " #FB2B76",
    textTransform: "none",
    font: "normal normal normal 1vw Open Sans",
  },
})(Button);
export const ButtonRed = withStyles({
  root: {
    background: " #FC7070 0% 0% no-repeat padding-box",
    borderRadius: 30,
    color: " #FFFFFF",
    font: "normal normal normal 1vw Open Sans",
    "&:hover": { background: "#FC7070 0% 0% no-repeat padding-box" },
    textTransform: "none",
  },
})(Button);
