import User from "../../models/user";
import Card from "@material-ui/core/Card";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea, CardContent, CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
  root: { maxWidth: 345, textAlign: "center" },
  media: { height: 300 },
  displayName: { font: "normal normal 600 1.2vw Open Sans", color: "#FB2B76" },
});
const imgPlaceholder = require("../../assets/img/image-placeholder.png");

export const UserCard = (user: User) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={user.photoURL ? user.photoURL : imgPlaceholder}
          title={user.displayName}
        />
        <CardContent>
          <div className={classes.displayName}>{user.displayName}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
