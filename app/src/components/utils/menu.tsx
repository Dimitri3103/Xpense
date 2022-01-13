import Link from "next/link";
import React from "react";
import { MenuItemCRuD, MenuNav } from "../../styles/others";

export function MenuGroup({
  classes,
  group,
  menuId,
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  setConfirmDialog,
  removeGroup,
  openUpdateDialog,
  openInviteDialog,
}) {
  return (
    <div>
      <MenuNav
        className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItemCRuD
          onClick={() => {
            openUpdateDialog(group);
          }}
        >
          <i className="uil uil-pen" style={{ marginRight: 5 }} />
          Modifier
        </MenuItemCRuD>
        <MenuItemCRuD
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: "Êtes-vous sûr de vouloir supprimer ce groupe ?",
              subTitle: "Vous ne pouvez pas annuler cette opération !!!",
              onConfirm: () => {
                removeGroup(group.id);
              },
            });
          }}
        >
          <i className="uil uil-trash-alt" style={{ marginRight: 5 }} />
          Supprimer
        </MenuItemCRuD>
        <MenuItemCRuD
          onClick={() => {
            openInviteDialog(group);
          }}
        >
          <i className="uil uil-user-plus" style={{ marginRight: 5 }} />
          Inviter
        </MenuItemCRuD>
      </MenuNav>
    </div>
  );
}
export function MenuTabExpenses({
  menuId,
  menuExp,
  isMenuOpen,
  handleMenuClose,
  route,
  routeAddExpense,
  setConfirmDialog,
  remove,
  sheetId,
}) {
  return (
    <div>
      <MenuNav
        style={{ marginTop: 28 }}
        anchorEl={menuExp}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItemCRuD>
          <i className="uil uil-eye" style={{ marginRight: 5 }} />
          <Link href={route} passHref>
            <div style={{ textDecoration: "none" }}>Consulter</div>
          </Link>
        </MenuItemCRuD>

        <MenuItemCRuD>
          <i className="uil uil-receipt" style={{ marginRight: 5 }} />
          <Link href={routeAddExpense} passHref>
            <div style={{ textDecoration: "none" }}>Ajouter dépenses</div>
          </Link>
        </MenuItemCRuD>

        <MenuItemCRuD
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: `Êtes-vous sûr de vouloir supprimer cette note de frais ?`,
              subTitle: "Vous ne pouvez pas annuler cette opération !!!",
              onConfirm: () => {
                remove(sheetId);
              },
            });
          }}
        >
          <i className="uil uil-trash-alt" style={{ marginRight: 5 }} />
          Supprimer
        </MenuItemCRuD>
      </MenuNav>
    </div>
  );
}
export function MenuApprovals({
  menuId,
  menuExp,
  isMenuOpen,
  handleMenuClose,
  route,
}) {
  return (
    <div>
      <MenuNav
        style={{ marginTop: 30 }}
        anchorEl={menuExp}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItemCRuD>
          <i className="uil uil-eye" style={{ marginRight: 5 }} />
          <Link href={route} passHref>
            <div style={{ textDecoration: "none" }}>Consulter</div>
          </Link>
        </MenuItemCRuD>

        <MenuItemCRuD>
          <i className="uil uil-trash-alt" style={{ marginRight: 5 }} />
          Rejeter
        </MenuItemCRuD>
      </MenuNav>
    </div>
  );
}
export function MenuCollaborators({
  menuId,
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  classes,
  setConfirmDialog,
  remove,
  user,
}) {
  return (
    <div>
      <MenuNav
        className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItemCRuD
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: `Êtes-vous sûr de vouloir supprimer ce collaborateur de l'organisation ?`,
              subTitle: "Vous ne pouvez pas annuler cette opération !!!",
              onConfirm: () => {
                remove(user.id);
              },
            });
          }}
        >
          <i className="uil uil-trash-alt" style={{ marginRight: 5 }} />{" "}
          Supprimer de l'organisation
        </MenuItemCRuD>
      </MenuNav>
    </div>
  );
}
export function MenuTabs({
  menuId,
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  openUpdateDialog,
  expType,
  setConfirmDialog,
  remove,
  nameAction,
}) {
  return (
    <div>
      <MenuNav
        style={{ marginTop: 28 }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItemCRuD
          onClick={() => {
            openUpdateDialog(expType.id);
          }}
        >
          <i className="uil uil-pen" style={{ marginRight: 5 }} /> Modifier
        </MenuItemCRuD>
        <MenuItemCRuD
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: `Êtes-vous sûr de vouloir supprimer ${nameAction} ?`,
              subTitle: "Vous ne pouvez pas annuler cette opération !!!",
              onConfirm: () => {
                remove(expType.id);
              },
            });
          }}
        >
          <i className="uil uil-trash-alt" style={{ marginRight: 5 }} />{" "}
          Supprimer
        </MenuItemCRuD>
      </MenuNav>
    </div>
  );
}
export function MenuInvitations({
  menuId,
  anchorEl,
  isMenuOpen,
  handleMenuClose,
  classes,
  invitation,
  setConfirmDialog,
  removeInvitation,
}) {
  return (
    <div>
      <MenuNav
        className={classes.menu}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItemCRuD
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: "Êtes-vous sûr de vouloir supprimer cette invitation ?",
              subTitle: "Vous ne pouvez pas annuler cette opération !!!",
              onConfirm: () => {
                removeInvitation(invitation.id);
              },
            });
          }}
        >
          <i className="uil uil-trash-alt" style={{ marginRight: 5 }} />
          Supprimer
        </MenuItemCRuD>
      </MenuNav>
    </div>
  );
}
