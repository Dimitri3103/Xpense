import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Button,
  Grid,
  InputBase,
} from "@material-ui/core";
import { useAuth } from "../../utils/firebase/auth";
import Router from "next/router";
import MenuListNotifications from "../notifications/menuList";
import navigationBar from "../../styles/components/navigationBar";
import { MenuItemCRuD, MenuNav } from "../../styles/others";

export default function NavbarAdmin() {
  const classes = navigationBar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationsOpen = Boolean(notificationsAnchorEl);

  const { auth } = useAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleClick = (href) => {
    Router.push(href);
    handleMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <MenuNav
      style={{ marginTop: 40 }}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItemCRuD onClick={() => handleClick("/admin/settings")}>
        <IconButton
          aria-label="profile of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          size="small"
        >
          <i
            className="uil uil-cog"
            style={{ marginRight: 5, color: "#9BABC5" }}
          />
        </IconButton>
        Paramètres
      </MenuItemCRuD>
    </MenuNav>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <MenuNav
      style={{ marginTop: 30 }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItemCRuD>
        {auth ? (
          <Avatar src={auth.photoUrl} className={classes.avatarImg} />
        ) : null}
      </MenuItemCRuD>
      <MenuItemCRuD onClick={() => handleClick("/admin/settings")}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu-mobile"
          aria-haspopup="true"
          color="inherit"
          size="small"
        >
          <i className="uil uil-cog" style={{ color: "#9BABC5" }} />
        </IconButton>
        Paramètres
      </MenuItemCRuD>
      <MenuItemCRuD onClick={() => handleClick("/admin/notifications")}>
        <IconButton
          aria-label="show new notifications"
          aria-controls="primary-search-account-menu-mobile"
          aria-haspopup="true"
          color="inherit"
          size="small"
        >
          <Badge badgeContent={4} color="secondary">
            <i className="uil uil-bell" style={{ color: "#9BABC5" }} />
          </Badge>
        </IconButton>
        Notifications
      </MenuItemCRuD>
    </MenuNav>
  );

  const notificationsMenuId = "notifications-menu";
  const renderNotifications = (
    <MenuNav
      className={classes.menuNotif}
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isNotificationsOpen}
      onClose={handleMenuClose}
    >
      <MenuListNotifications />
      <Grid container>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button
            className={classes.btnNotif}
            onClick={() => handleClick("/admin/notifications")}
          >
            Voir plus
          </Button>
        </Grid>
      </Grid>
    </MenuNav>
  );
  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <a href="/admin" className={classes.title}>
            Xpense
          </a>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <i className="uil uil-search" />
            </div>
            <InputBase
              placeholder="Rechercher"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show new notifications"
              aria-controls={notificationsMenuId}
              aria-haspopup="true"
              onClick={handleNotificationsMenuOpen}
            >
              <Badge badgeContent={4} color="secondary">
                <i className="uil uil-bell" style={{ color: "#9BABC5" }} />
              </Badge>
            </IconButton>

            {auth ? (
              <Avatar src={auth.photoUrl} className={classes.avatarImg} />
            ) : null}

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
              <i className="uil uil-angle-down" style={{ color: "#9BABC5" }} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <i className="uil uil-bars" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotifications}
    </div>
  );
}
