import { makeStyles } from "@material-ui/core";

const layoutStyle = makeStyles((theme) => ({
  root: {},
  body: {
    display: "flex",
    flex: "1 1 auto",
    paddingTop: 64,
    paddingLeft: 10,
    margin: theme.spacing(1),
  },
}));

export default layoutStyle;
