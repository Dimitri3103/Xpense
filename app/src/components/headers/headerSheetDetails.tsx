import { Avatar, Button, Grid } from "@material-ui/core";
import React from "react";
import { RoleUser, TextDialog, TitleHead } from "../../styles/typography";
import Router from "next/router";

export const HeaderSheetApproval = ({ classes, currentSheet, users }) => {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <TitleHead>Détails de la note de frais</TitleHead>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "end" }}>
          <Button
            className={classes.btnCancel}
            onClick={() => Router.push("/supervisor/approvals")}
          >
            <i className="uil uil-times" /> Annuler
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <TextDialog>Libellé :</TextDialog>
        </Grid>
        <Grid item xs={11}>
          {currentSheet ? (
            <div className={classes.ref}>{currentSheet.label}</div>
          ) : null}
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <TextDialog>Liste des dépenses</TextDialog>
        </Grid>
        <Grid item xs={2}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {currentSheet
                ? users.map((user) =>
                    currentSheet.userId == user.id ? (
                      <Avatar
                        key={user.id}
                        className={classes.picUser}
                        src={user.photoURL}
                      />
                    ) : null
                  )
                : null}
            </Grid>
            <Grid item xs={9}>
              {currentSheet
                ? users.map((user) =>
                    currentSheet.userId == user.id ? (
                      <Grid key={user.id} container direction="column">
                        <Grid item xs={12}>
                          <div className={classes.nameUser}>
                            {user.displayName}
                          </div>
                        </Grid>
                        <Grid item xs={12}>
                          {/* <RoleUser
                            key={user.id}
                            style={{
                              textAlign: "start",
                              fontSize: "0.6vw",
                            }}
                          >
                            {user.roleName}
                          </RoleUser> */}
                        </Grid>
                      </Grid>
                    ) : null
                  )
                : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export const HeaderSheetUser = ({ classes, routeCancel, currentSheet }) => {
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={10}>
          <TitleHead>Détails de la note de frais</TitleHead>
        </Grid>
        <Grid item xs={2} style={{ textAlign: "end" }}>
          <Button
            className={classes.btnCancel}
            onClick={() => Router.push(routeCancel)}
          >
            <i className="uil uil-times" /> Annuler
          </Button>
        </Grid>
      </Grid>
      <Grid container alignItems="center" style={{ marginTop: 10 }}>
        <Grid item xs={1}>
          <TextDialog>Libellé :</TextDialog>
        </Grid>
        <Grid item xs={11}>
          {currentSheet ? (
            <div className={classes.ref}>{currentSheet.label}</div>
          ) : null}
        </Grid>
      </Grid>
      <Grid container alignItems="center" style={{ marginTop: 10 }}>
        <Grid item xs={10}>
          <TextDialog>Liste des dépenses</TextDialog>
        </Grid>
      </Grid>
    </div>
  );
};
