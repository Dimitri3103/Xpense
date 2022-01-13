import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  getUsersByOrg,
  removeUserFromCorporation,
} from "../../services-back/admin/userService";
import gridViewStyle from "../../styles/components/gridViewStyle";
import { MenuIconGrid } from "../utils";
import { ButtonAction } from "../../styles/others";
import { GroupName, NameUser, RoleUser } from "../../styles/typography";
import { AvatarUser, PaperList, StyledBadge } from "../../styles/others";
import { MenuCollaborators } from "../utils/menu";
import { getGroups } from "../../services-back/admin/groupService";
import ConfirmDialog from "../dialogs/confirmDialog";
import { AlertBar } from "../Notification";

const ListCollaborators = (org) => {
  const classes = gridViewStyle();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    loadUsers();
    handleMenuClose();
  };

  const removeUser = (id) => {
    removeUserFromCorporation(id)
      .then(() => {
        closeConfirmDialog();
      })
      .then(() => showAlert("success", "Collaborateur Supprimé"))
      .catch(() => showAlert("error", "Erreur de suppression"));
  };

  const [alertMeta, setAlertMeta] = useState({ severity: "", message: "" });
  const [isAlertOpen, setAlertOpen] = useState(false);

  const showAlert = (severity, message) => {
    setAlertMeta({ severity, message });
    setAlertOpen(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

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

  const [groups, setGroups] = useState([]);
  function loadGroups() {
    getGroups(org.id).then((res) => setGroups(res));
  }

  const menuId = "menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    loadUsers();
    loadGroups();
  }, []);

  const [selected, setSelected] = useState({ id: "" });

  return (
    <>
      <Grid container spacing={1}>
        {groups.map((group) => (
          <Grid key={group.id} item container spacing={1}>
            <Grid item xs={12}>
              <GroupName>{group.name}</GroupName>
            </Grid>
            {users.map((user) =>
              group.members.includes(user.id) ||
              group.supervisors.includes(user.id) ? (
                <Grid item key={user.id} xs={3} style={{ marginBottom: 10 }}>
                  <PaperList>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item className={classes.itemAvatar}>
                        <StyledBadge
                          overlap="circle"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          variant="dot"
                          className={classes.styledBadge}
                        >
                          <AvatarUser
                            className={classes.imgUser}
                            src={user.photoURL}
                          />
                        </StyledBadge>
                      </Grid>
                      <Grid item xs={12} sm container spacing={1}>
                        <Grid item xs container direction="column">
                          <Grid item xs>
                            <NameUser>{user.displayName}</NameUser>
                            {/* <RoleUser>{user.roleName}</RoleUser> */}
                          </Grid>
                          <Grid item className={classes.itemBtnAction}>
                            <ButtonAction size="small">
                              <i
                                className="uil uil-message"
                                style={{ fontSize: "1.1vw" }}
                              />
                            </ButtonAction>
                          </Grid>
                        </Grid>
                        <MenuIconGrid
                          aria-controls={menuId}
                          onClick={(event) => {
                            setSelected(user);
                            setAnchorEl(event.currentTarget);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </PaperList>
                </Grid>
              ) : null
            )}
          </Grid>
        ))}
      </Grid>
      <MenuCollaborators
        menuId={menuId}
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        classes={classes}
        user={selected}
        setConfirmDialog={setConfirmDialog}
        remove={removeUser}
      />
      <AlertBar
        open={isAlertOpen}
        onClose={handleAlertClose}
        alertMeta={alertMeta}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ListCollaborators;
