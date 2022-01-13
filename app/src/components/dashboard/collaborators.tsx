import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUsersByOrg } from "../../services-back/admin/userService";
import Router from "next/router";
import Expenses from "./expenses";
import gridViewStyle from "../../styles/components/gridViewStyle";
import dashboardCollaborators from "../../styles/components/dashboardCollaborators";
import { NameUser, RoleUser, TitleHead } from "../../styles/typography";
import {
  AvatarUser,
  PaperList,
  ButtonAction,
  ButtonBlue,
} from "../../styles/others";

const Collaborators = (org) => {
  const classe1 = dashboardCollaborators();
  const classe2 = gridViewStyle();

  const [users, setUsers] = useState([]);
  function loadUsers() {
    getUsersByOrg(org.id).then((res) =>
      setUsers(
        res.filter((user) => {
          return user.email != "ndimitri.ngoutouga1@gmail.com";
        })
      )
    );
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item container>
          <Grid item container xs={10} alignItems="center">
            <TitleHead>Collaborateurs</TitleHead>
            <div className={classe1.members}>{users.length} membres</div>
          </Grid>
          <Grid item xs={2}>
            <ButtonBlue
              className={classe1.btnAddMembers}
              onClick={() => Router.push("/admin/collaborators")}
            >
              Invitez des membres
              <i className="uil uil-angle-right-b" />
            </ButtonBlue>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        {users.slice(0, 7).map((user) => (
          <Grid key={user.id} item xs={3} style={{ marginBottom: 10 }}>
            <PaperList>
              <Grid container spacing={1}>
                <Grid item className={classe2.itemAvatar}>
                  <AvatarUser
                    src={user.photoURL}
                    style={{ marginLeft: 5, marginTop: 5 }}
                  />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column">
                    <Grid item xs container alignItems="center">
                      <Grid item>
                        <NameUser>{user.displayName}</NameUser>
                      </Grid>
                      <Grid item>
                        <i
                          className="uil uil-invoice"
                          style={{
                            color: "#38D643",
                            marginLeft: 5,
                            fontSize: "1.1vw",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid item>
                      {/* <RoleUser>{user.roleName}</RoleUser> */}
                    </Grid>
                    <Grid item xs>
                      <Grid container spacing={1}>
                        <Grid item className={classe2.itemBtnAction}>
                          <ButtonAction size="small">
                            <i
                              className="uil uil-message"
                              style={{
                                fontSize: "1.1vw",
                              }}
                            />
                          </ButtonAction>
                        </Grid>
                        <Grid item className={classe2.itemBtnAction}>
                          <ButtonAction size="small">
                            <i
                              className="uil uil-trash-alt"
                              style={{ fontSize: "1.1vw" }}
                            />
                          </ButtonAction>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PaperList>
          </Grid>
        ))}
        {users.length > 7 ? (
          <Grid
            item
            xs={1}
            container
            alignItems="center"
            style={{ marginLeft: 60 }}
          >
            <div className={classe1.paperMore}> + {users.length - 7}</div>
          </Grid>
        ) : null}
      </Grid>

      <br />
      <Expenses {...org} />
    </>
  );
};

export default Collaborators;
