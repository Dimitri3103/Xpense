import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUsersByOrg } from "../../services-back/admin/userService";
import gridViewStyle from "../../styles/components/gridViewStyle";
import { MenuIconGrid } from "../utils";
import { Amount, GroupName, NameUser, RoleUser } from "../../styles/typography";
import { AvatarUser, StyledBadge, PaperList } from "../../styles/others";
import { getSheets } from "../../services-back/sheetService";
import { MenuApprovals } from "../utils/menu";
import { getGroups } from "../../services-back/admin/groupService";

const GridView = (org) => {
  const classes = gridViewStyle();

  const menuId = "menu";
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [selected, setSelected] = useState({ id: "" });

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [sheets, setSheets] = useState([]);
  function loadSheets() {
    getSheets(org.id).then((res) => setSheets(res));
  }

  const [users, setUsers] = useState([]);
  function loadUsers() {
    getUsersByOrg(org.id).then((res) => setUsers(res));
  }

  const [groups, setGroups] = useState([]);
  function loadGroups() {
    getGroups(org.id).then((res) => setGroups(res));
  }

  useEffect(() => {
    loadUsers();
    loadSheets();
    loadGroups();
  }, []);

  let route = {
    pathname: `/sheet/approval/${selected}`,
    query: { org: org.id },
  };

  return (
    <>
      <Grid container spacing={1}>
        {groups.map((group) => (
          <Grid key={group.id} item container spacing={1}>
            <Grid item xs={12}>
              <GroupName>{group.name}</GroupName>
            </Grid>
            {users.map((user) =>
              sheets.map((sheet) =>
                group.members.includes(user.id) ? (
                  sheet.userId == user.id ? (
                    <Grid
                      item
                      key={sheet.id}
                      xs={3}
                      style={{ marginBottom: 10 }}
                    >
                      <PaperList key={user.id}>
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
                          <Grid item xs={12} sm container>
                            <Grid item xs container direction="column">
                              <Grid item xs container alignItems="center">
                                <Grid item>
                                  <NameUser>{user.displayName}</NameUser>
                                </Grid>
                                <i
                                  className="uil uil-invoice"
                                  style={{
                                    color: "#38D643",
                                    fontSize: "1vw",
                                    marginLeft: 5,
                                  }}
                                />
                              </Grid>
                              <Grid item>
                                {/* <RoleUser>{user.roleName}</RoleUser> */}
                              </Grid>
                              <Grid item>
                                <Amount>{sheet.total}</Amount>
                              </Grid>
                            </Grid>

                            <Grid item>
                              <MenuIconGrid
                                aria-controls={menuId}
                                onClick={(event) => {
                                  setSelected(sheet.id);
                                  setAnchorEl(event.currentTarget);
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </PaperList>
                    </Grid>
                  ) : null
                ) : null
              )
            )}
          </Grid>
        ))}
      </Grid>
      <MenuApprovals
        menuId={menuId}
        menuExp={anchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        route={route}
      />
    </>
  );
};

export default GridView;
