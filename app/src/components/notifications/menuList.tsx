import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/admin/userService";
import { StyledDivider, AvatarUser } from "../../styles/others";
import { NameUser } from "../../styles/typography";

const useStyles = makeStyles((theme) => ({
  textNotif: { font: "normal normal normal 0.7vw Open Sans", color: "#9BABC5" },
  imgNotif: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginLeft: theme.spacing(0.5),
  },
  itemNotif: {
    cursor: "pointer",
    "&:hover": {
      background: "#F1F8FF 0% 0% no-repeat padding-box",
    },
  },
}));

const MenuListNotifications = React.forwardRef(() => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      {users.slice(0, 4).map((user) => (
        <div key={user.id} className={classes.itemNotif}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <AvatarUser
                className={classes.imgNotif}
                src={require(`../../assets/img/users/${user.picture}`)}
              />
            </Grid>
            <Grid item xs={10}>
              <NameUser>
                {user.first_name} {user.last_name}
              </NameUser>
              <div className={classes.textNotif}>
                Aliquam ornare vulputate mi eget
              </div>
            </Grid>
          </Grid>
          <StyledDivider style={{ margin: "5px 0px 5px 0px" }} />
        </div>
      ))}
    </>
  );
});

export default MenuListNotifications;
