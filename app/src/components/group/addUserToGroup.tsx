import {
  Avatar,
  CircularProgress,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ButtonBlue, ButtonRed } from "../../styles/others";
import { NameUser, RoleUser } from "../../styles/typography";
import {
  addSupervisorToGroup,
  addUserToGroup,
  getGroup,
  removeSupervisorFromGroup,
  removeUserFromGroup,
} from "../../services-back/admin/groupService";
import { updateRole } from "../../services-back/admin/userService";

export const AddSupervisor = ({
  classes,
  users,
  search,
  org,
  selected,
  loadGroups,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentGroup, setCurrentGroup] = useState(null);
  function getCurrentGroup() {
    getGroup(org.toString(), selected.id).then((group) => {
      setCurrentGroup(group);
    });
    setIsLoading(false);
    loadGroups();
  }

  useEffect(() => {
    getCurrentGroup();
  }, [selected.id]);

  const handleLoading = () => {
    loadGroups();
    getCurrentGroup();
    setIsLoading(true);
    getCurrentGroup();
  };
  const addSupervisor = (id) => {
    let obj = { userId: id };
    addSupervisorToGroup(org.id, selected.id, obj);
    handleLoading();
  };

  const removeUser = (id) => {
    removeSupervisorFromGroup(org.id, selected.id, id);
    handleLoading();
  };

  useEffect(() => {
    getCurrentGroup();
  }, [selected.id]);

  if (isLoading) {
    return <LinearProgress />;
  } else {
    return (
      <div className={classes.content}>
        {users.map((user) => {
          if (
            search == "" ||
            user.displayName.toLowerCase().includes(search.toLowerCase())
          ) {
            return (
              <Grid spacing={1} container key={user.id} alignItems="center">
                <Grid item xs={2}>
                  <Avatar className={classes.small} src={user.photoURL} />
                </Grid>
                <Grid item xs={7}>
                  <NameUser style={{ textAlign: "start" }}>
                    {user.displayName}
                  </NameUser>
                  {/* <RoleUser style={{ textAlign: "start" }}>{user.roleName}</RoleUser> */}
                </Grid>
                <Grid item xs={2}>
                  {currentGroup ? (
                    currentGroup.supervisors.includes(user.id) == true ? (
                      <ButtonRed
                        className={classes.btnAdd}
                        onClick={() => {
                          removeUser(user.id);
                        }}
                      >
                        Retirer
                      </ButtonRed>
                    ) : (
                      <ButtonBlue
                        className={classes.btnAdd}
                        onClick={() => {
                          addSupervisor(user.id);
                        }}
                      >
                        Ajouter
                      </ButtonBlue>
                    )
                  ) : (
                    <CircularProgress size={20} />
                  )}
                </Grid>
              </Grid>
            );
          }
          return null;
        })}
      </div>
    );
  }
};
export const AddCollaborator = ({
  classes,
  users,
  search,
  org,
  selected,
  loadGroups,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentGroup, setCurrentGroup] = useState(null);
  function getCurrentGroup() {
    getGroup(org.toString(), selected.id).then((group) => {
      setCurrentGroup(group);
    });
    setIsLoading(false);
    loadGroups();
  }

  useEffect(() => {
    getCurrentGroup();
  }, [selected.id]);

  const handleLoading = () => {
    loadGroups();
    getCurrentGroup();
    setIsLoading(true);
    getCurrentGroup();
  };
  const addCollaborator = (id) => {
    let obj = { userId: id };
    addUserToGroup(org.id, selected.id, obj);
    handleLoading();
  };

  const removeUser = (id) => {
    removeUserFromGroup(org.id, selected.id, id);
    handleLoading();
  };

  useEffect(() => {
    getCurrentGroup();
  }, [selected.id]);

  if (isLoading) {
    return <LinearProgress />;
  } else {
    return (
      <div className={classes.content}>
        {users.map((user) => {
          if (
            search == "" ||
            user.displayName.toLowerCase().includes(search.toLowerCase())
          ) {
            return (
              <Grid container spacing={1} key={user.id} alignItems="center">
                <Grid item xs={2}>
                  <Avatar className={classes.small} src={user.photoURL} />
                </Grid>
                <Grid item xs={7}>
                  <NameUser style={{ textAlign: "start" }}>
                    {user.displayName}
                  </NameUser>
                  {/* <RoleUser style={{ textAlign: "start" }}>
                    {user.roleName}
                  </RoleUser> */}
                </Grid>
                <Grid item xs={2}>
                  {currentGroup ? (
                    currentGroup.members.includes(user.id) == true ? (
                      <ButtonRed
                        className={classes.btnAdd}
                        onClick={() => {
                          removeUser(user.id);
                        }}
                      >
                        Retirer
                      </ButtonRed>
                    ) : (
                      <ButtonBlue
                        className={classes.btnAdd}
                        onClick={() => {
                          addCollaborator(user.id);
                        }}
                      >
                        Ajouter
                      </ButtonBlue>
                    )
                  ) : (
                    <CircularProgress size={20} />
                  )}
                </Grid>
              </Grid>
            );
          }
          return null;
        })}
      </div>
    );
  }
};
