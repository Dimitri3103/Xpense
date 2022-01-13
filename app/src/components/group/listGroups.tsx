import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, Avatar, Grid } from "@material-ui/core";
import AddGroup from "../../components/group/addGroup";
import { AlertBar } from "../../components/Notification";
import ConfirmDialog from "../../components/dialogs/confirmDialog";
import InviteCollaborators from "./inviteCollaborators";
import UpdateGroup from "./updateGroup";
import listGroups from "../../styles/components/listGroups";
import { MenuIconGrid } from "../utils";
import { TextCard, TitleHead } from "../../styles/typography";
import { GridCard, AvatarGroupUser, ButtonBlue } from "../../styles/others";
import { getUsersByOrg } from "../../services-back/admin/userService";
import { MenuGroup } from "../utils/menu";
import {
  createGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from "../../services-back/admin/groupService";

const ListGroups = (org) => {
  const classes = listGroups();

  const [groups, setGroups] = useState([]);
  function loadGroups() {
    getGroups(org.id).then((groups) => {
      setGroups(groups);
    });
  }

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
    loadGroups();
    loadUsers();
  }, []);

  const menuId = "crud-menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [alertMeta, setAlertMeta] = useState({ severity: "", message: "" });
  const [isAlertOpen, setAlertOpen] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setInviteDialogOpen] = useState(false);

  const [selected, setSelected] = useState({ id: "", name: "" });

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const openAddGroupDialog = () => {
    setDialogOpen(true);
  };
  const openInviteDialog = (group) => {
    setSelected(group);
    setInviteDialogOpen(true);
    handleMenuClose();
  };
  const openUpdateDialog = (group) => {
    setSelected(group);
    setUpdateDialogOpen(true);
  };
  const closeAddGroupDialog = () => {
    setDialogOpen(false);
    handleMenuClose();
    loadGroups();
  };
  const closeInviteDialog = () => {
    setInviteDialogOpen(false);
    handleMenuClose();
    loadGroups();
  };
  const closeUpdateDialog = () => {
    setSelected({ id: "", name: "" });
    setUpdateDialogOpen(false);
    handleMenuClose();
    loadGroups();
  };
  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    loadGroups();
  };
  const handleAddSubmit = (group) => {
    addGroup(group);
    loadGroups();
  };
  const addGroup = (data) => {
    createGroup(org.id, data).then(() => {
      closeAddGroupDialog();
    });
  };
  const removeGroup = (id) => {
    deleteGroup(org.id, id)
      .then(() => {
        closeConfirmDialog();
      })
      .then(() => {
        handleMenuClose();
      })
      .then(() => showAlert("success", "Groupe Supprimé"))
      .catch(() => showAlert("error", "Erreur de suppression"));
  };
  const changeGroup = (group) => {
    group.id = selected.id;
    updateGroup(org.id, group.id, group)
      .then(() => {
        closeUpdateDialog();
      })
      .then(() => {
        handleMenuClose();
      });
  };
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

  return (
    <>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={10}>
          <TitleHead>Liste des groupes</TitleHead>
        </Grid>
        <Grid item xs={2}>
          <ButtonBlue
            className={classes.btnAddGroups}
            onClick={openAddGroupDialog}
          >
            Ajouter des groupes <i className="uil uil-angle-right-b"></i>
          </ButtonBlue>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: 5, marginBottom: 5 }}>
        {groups.map((group) => (
          <Grid key={group.id} item xs={3}>
            <Card className={classes.groupCard}>
              <CardHeader
                action={
                  <MenuIconGrid
                    aria-controls={menuId}
                    onClick={(event) => {
                      setSelected(group);
                      setAnchorEl(event.currentTarget);
                    }}
                  />
                }
                title={
                  <div className={classes.nameGroup}>
                    {group.name}
                    <i
                      className="uil uil-pen"
                      style={{ color: "#FB2B76", marginLeft: 5 }}
                    />
                  </div>
                }
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <GridCard item xs={4}>
                        <TextCard>Responsables :</TextCard>
                      </GridCard>
                      <Grid item xs={8}>
                        <AvatarGroupUser max={2}>
                          {group?.supervisors.map((sup) =>
                            users.map(
                              (user) =>
                                sup == user.id && (
                                  <Avatar key={user.id} src={user.photoURL} />
                                )
                            )
                          )}
                        </AvatarGroupUser>
                      </Grid>
                      <Grid container alignItems="center">
                        <GridCard item xs={4}>
                          <TextCard>Collaborateurs :</TextCard>
                        </GridCard>
                        <AvatarGroupUser max={4}>
                          {group?.members.map((member) =>
                            users.map(
                              (user) =>
                                member == user.id && (
                                  <Avatar key={user.id} src={user.photoURL} />
                                )
                            )
                          )}
                        </AvatarGroupUser>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <AddGroup
          open={isDialogOpen}
          handleClose={closeAddGroupDialog}
          handleAddGroup={handleAddSubmit}
        />
        <UpdateGroup
          open={isUpdateDialogOpen}
          handleClose={closeUpdateDialog}
          handleUpdateGroup={changeGroup}
          selected={selected}
        />
        <InviteCollaborators
          open={isInviteDialogOpen}
          handleClose={closeInviteDialog}
          selected={selected}
          org={org}
          users={users}
          loadGroups={loadGroups}
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
        <MenuGroup
          classes={classes}
          group={selected}
          menuId={menuId}
          anchorEl={anchorEl}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
          openUpdateDialog={openUpdateDialog}
          openInviteDialog={openInviteDialog}
          setConfirmDialog={setConfirmDialog}
          removeGroup={removeGroup}
        />
      </Grid>
    </>
  );
};

export default ListGroups;
