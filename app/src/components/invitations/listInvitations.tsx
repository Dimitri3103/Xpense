import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import gridViewStyle from "../../styles/components/gridViewStyle";
import { MenuIconGrid } from "../utils";
import { NameUser, RoleUser } from "../../styles/typography";
import { StyledBadge, PaperList, AvatarUser } from "../../styles/others";
import {
  deleteInvitation,
  getInvitation,
} from "../../services-back/admin/invitationService";
import { MenuInvitations } from "../utils/menu";
import { AlertBar } from "../Notification";
import ConfirmDialog from "../dialogs/confirmDialog";
import { getRoles } from "../../services-back/admin/roleService";
import Role from "../../models/role";

const ListInvitations = ({ org, invitations, loadInvitations }) => {
  const classes = gridViewStyle();

  const menuId = "menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [selected, setSelected] = useState({
    id: "",
    email: "",
    roleId: "",
    groupId: "",
    status: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    loadInvitations();
  };

  const removeInvitation = (id) => {
    deleteInvitation(org.id, id)
      .then(() => {
        closeConfirmDialog();
      })
      .then(() => {
        handleMenuClose();
      })
      .then(() => showAlert("success", "Invitation Supprimée"))
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
  useEffect(() => {
    loadInvitations();
  }, []);
  return (
    <Grid container spacing={1} style={{ marginTop: 5 }}>
      {invitations.slice(0, 4).map((invitation) => (
        <Grid item key={invitation.id} xs={3}>
          <PaperList>
            <Grid container spacing={1} alignItems="center">
              <Grid item className={classes.itemAvatar}>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  variant="dot"
                  className={classes.styledBadgeInvitation}
                >
                  <AvatarUser className={classes.imageInvitation} />
                </StyledBadge>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column">
                  <Grid item xs>
                    <NameUser>{invitation.email}</NameUser>
                    <RoleComponent
                      invitationId={invitation.id}
                      orgId={org.id}
                    />
                  </Grid>
                </Grid>

                <div className={classes.stateInvitation}>
                  {invitation.status}
                </div>

                <MenuIconGrid
                  aria-controls={menuId}
                  onClick={(event) => {
                    setSelected(invitation);
                    setAnchorEl(event.currentTarget);
                  }}
                />
              </Grid>
            </Grid>
          </PaperList>
        </Grid>
      ))}
      <AlertBar
        open={isAlertOpen}
        onClose={handleAlertClose}
        alertMeta={alertMeta}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <MenuInvitations
        classes={classes}
        invitation={selected}
        menuId={menuId}
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        setConfirmDialog={setConfirmDialog}
        removeInvitation={removeInvitation}
      />
    </Grid>
  );
};

export const RoleComponent = ({ invitationId, orgId }) => {
  const [currentInvitation, setCurrentInvitation] = useState(null);
  function getCurrentInvitation() {
    getInvitation(orgId, invitationId).then((invit) => {
      setCurrentInvitation(invit);
    });
  }

  const [roles, setRoles] = useState([]);
  function loadRoles() {
    if (roles.length == 0) {
      getRoles()
        .then((data: Role[]) => {
          const result = [];
          data.forEach((r) => result.push({ label: r.nameFR, value: r.id }));
          return result;
        })
        .then(setRoles);
    }
  }

  useEffect(() => {
    loadRoles();
    getCurrentInvitation();
  }, []);
  return (
    <>
      {currentInvitation
        ? roles.map((role) =>
            role.value === currentInvitation.roleId ? (
              <RoleUser key={role.value}>{role.label}</RoleUser>
            ) : null
          )
        : null}
    </>
  );
};

export default ListInvitations;
