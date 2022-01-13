import { Grid } from "@material-ui/core";
import React from "react";
import { AvatarUser } from "../../styles/others";

export const HeaderSettings = (props) => {
  const { classes, auth, tab } = props;
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          {auth ? <AvatarUser src={auth.photoUrl} /> : null}
        </Grid>
        <Grid item xs={11}>
          <div className={classes.nameBox}>
            {auth ? <span className={classes.name}>{auth.name}</span> : null}
            <span className={classes.greyText}> - </span>
            <div className={classes.nameTab}>{tab}</div>
          </div>
          <div className={classes.greyText}></div>
        </Grid>
      </Grid>
    </div>
  );
};
