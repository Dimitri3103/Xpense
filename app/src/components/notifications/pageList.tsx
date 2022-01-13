import { Button, Grid, IconButton, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../services/admin/userService";
import { AvatarUser } from "../../styles/others";
import { NameUser } from "../../styles/typography";

const useStyles = makeStyles((theme) => ({
  textNotif: {
    font: "normal normal normal 0.75vw Open Sans",
    color: "#07114B",
  },
  itemNotif: {
    width: "100%",
    cursor: "pointer",
    padding: theme.spacing(1.5),
    margin: "10px 0px 10px 0px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 1px 8px #00000008",
    borderRadius: 17,
    position: "relative",
  },
  btnClose: {
    position: "absolute",
    right: theme.spacing(1),
    top: 0,
  },
  btnMore: {
    width: "10%",
    height: 25,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #2F45C5",
    borderRadius: 30,
    textTransform: "none",
    font: " normal normal normal 1vw Tajawal",
    letterSpacing: 0,
    color: "#2F45C5",
  },
}));

const PageListNotifications = ({
  notifications,
  handleShowMoreNotifications,
}) => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  function loadUsers() {
    getUsers().then((res) => setUsers(res.data));
  }

  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <div>
      {users.slice(0, notifications).map((user) => (
        <div key={user.id} className={classes.itemNotif}>
          <Grid container alignItems="flex-start" spacing={1}>
            <Grid item>
              <AvatarUser
                src={require(`../../assets/img/users/${user.picture}`)}
              />
            </Grid>
            <Grid item xs={10}>
              <NameUser style={{ textAlign: "start" }}>
                {user.first_name} {user.last_name}
              </NameUser>
              <div className={classes.textNotif}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                faucibus pretium tellus eget pharetra. Aliquam ornare vulputate
                mi eget consectetur. Etiam et tempor augue. Etiam consectetur
                mauris dui. Vestibulum nec ipsum sed quam vehicula condimentum
                nec id felis. Vestibulum sit amet lorem ac nunc molestie
                volutpat. Etiam a lectus finibus, porta odio in, tempor massa.
                Nullam eu vehicula quam. Donec gravida mollis nisl, id gravida
                turpis rutrum ut.
              </div>
            </Grid>
            <Grid item>
              <IconButton size="small" className={classes.btnClose}>
                <i className="uil uil-times" style={{ fontSize: "1.5vw" }} />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      ))}
      {users.length - notifications > 0 ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button
            className={classes.btnMore}
            onClick={handleShowMoreNotifications}
          >
            Voir plus <i className="uil uil-angle-down" />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default PageListNotifications;
