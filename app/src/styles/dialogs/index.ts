import {
  createStyles,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  withStyles,
} from "@material-ui/core";

export const CloseButon = withStyles((theme) =>
  createStyles({
    root: {
      position: "absolute",
      right: 8,
      top: 8,
      padding: 0,
      margin: 0,
      color: "#FB2B76",
      "&:hover": { background: "transparent" },
    },
  })
)(IconButton);

export const CommonDialogActions = withStyles((theme) =>
  createStyles({
    root: { display: "flex" },
  })
)(DialogActions);

export const CommonDialogContent = withStyles((theme) =>
  createStyles({
    root: { padding: "10px 14px" },
  })
)(DialogContent);

export const CommonDialogTitle = withStyles((theme) =>
  createStyles({
    root: {
      paddingTop: 10,
      paddingLeft: 10,
      [theme.breakpoints.up("md")]: { paddingTop: 12 },
      [theme.breakpoints.up("lg")]: { paddingTop: 14 },
    },
  })
)(DialogTitle);
