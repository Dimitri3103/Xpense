import { createStyles, Typography, withStyles } from "@material-ui/core";

export const Amount = withStyles((theme) =>
  createStyles({
    root: {
      font: "normal normal bold 1vw Open Sans",
      color: "#2F45C5",
      letterSpacing: 0,
      textAlign: "center",
      [theme.breakpoints.up("sm")]: { textAlign: "start" },
    },
  })
)(Typography);
export const AmountDetails = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal 600 0.9vw Open Sans", color: "#2F45C5" },
  })
)(Typography);

export const TitleDialog = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal bold 1vw Open Sans", color: "#07114B" },
  })
)(Typography);

export const GroupName = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal bold 1vw Open Sans", color: "#9BABC5" },
  })
)(Typography);

export const LabelSort = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal 600 0.8vw Open Sans", color: "#9BABC5" },
  })
)(Typography);

export const DetailsLabel = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal 600 0.9vw Open Sans", color: "#9BABC5" },
  })
)(Typography);

export const NameUser = withStyles((theme) =>
  createStyles({
    root: {
      font: "normal normal 600 0.8vw Open Sans",
      color: "#07114B",
      textAlign: "center",
      [theme.breakpoints.up("sm")]: { textAlign: "start" },
    },
  })
)(Typography);

export const RoleUser = withStyles((theme) =>
  createStyles({
    root: {
      font: "normal normal 600 0.8vw Open Sans",
      color: "#9BABC5",
      textAlign: "center",
      [theme.breakpoints.up("sm")]: { textAlign: "start" },
    },
  })
)(Typography);

export const Status = withStyles((theme) =>
  createStyles({
    root: {
      borderRadius: 30,
      font: "normal normal normal 0.9vw Open Sans",
      textAlign: "center",
      color: "#FFFFFF",
    },
  })
)(Typography);

export const TextCard = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal 600 0.8vw Open Sans", color: "#9BABC5" },
  })
)(Typography);

export const TextDetails = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal 600 0.9vw Open Sans", color: "#07114BC2" },
  })
)(Typography);

export const TextDialog = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal 600 0.9vw Open Sans", color: "#9BABC5" },
  })
)(Typography);

export const TextGrid = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal 600 0.9vw Open Sans", color: "#07114B" },
  })
)(Typography);

export const TitleHead = withStyles((theme) =>
  createStyles({
    root: { font: "normal normal 800 2vw Open Sans", color: "#07114B" },
  })
)(Typography);

export const TitleSetting = withStyles((theme) =>
  createStyles({
    root: {
      font: "normal normal 800 1.5vw Open Sans",
      color: "#07114B",
      textAlign: "center",
    },
  })
)(Typography);
