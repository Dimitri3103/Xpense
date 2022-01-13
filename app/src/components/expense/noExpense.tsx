import { createStyles, makeStyles, Paper } from "@material-ui/core";

const imgFile = require("../../assets/img/file.png");
const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      boxShadow: "0px 1px 8px #00000008",
      borderRadius: 17,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      marginTop: theme.spacing(1),
    },
    imgFile: {width: "5%",height: "5%",},
    textNoExpense: {
      font: "normal normal bold 1vw Open Sans",
      color: "#9BABC5",
      marginTop: theme.spacing(1),
    },
  })
);

const NoExpense = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <img src={imgFile} alt="" className={classes.imgFile} />
      <span className={classes.textNoExpense}>
        Aucune dépense n'a été ajoutée
      </span>
    </Paper>
  );
};

export default NoExpense;
