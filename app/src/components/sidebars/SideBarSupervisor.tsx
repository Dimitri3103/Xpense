import React from "react";
import { List, ListItem } from "@material-ui/core";
import { useAuth } from "../../utils/firebase/auth";
import ActiveLink from "../utils/ActiveLink";
import sideBar from "../../styles/components/sideBar";

const SideBarSupervisor = () => {
  const classes = sideBar();
  const { auth, signOut } = useAuth();

  return (
    <div className={classes.sideBar}>
      <List component="nav">
        <ActiveLink href="/supervisor">
          <ListItem button>
            <div>
              <i
                className="uil uil-invoice"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Mes notes de frais
            </div>
          </ListItem>
        </ActiveLink>
        <ActiveLink href="/supervisor/approvals">
          <ListItem button>
            <div>
              <i
                className="uil uil-usd-circle"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Approbations
            </div>
          </ListItem>
        </ActiveLink>
        <ActiveLink href="/supervisor/profile">
          <ListItem button>
            <div>
              <i
                className="uil uil-user-circle"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Profil
            </div>
          </ListItem>
        </ActiveLink>
        <ActiveLink href="/supervisor/report">
          <ListItem button>
            <div>
              <i
                className="uil uil-file-graph"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Rapport
            </div>
          </ListItem>
        </ActiveLink>
      </List>
      <div className={classes.grow} />
      <List component="nav">
        <ActiveLink href="/supervisor/settings">
          <ListItem button>
            <div>
              <i
                className="uil uil-setting"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Paramètres
            </div>
          </ListItem>
        </ActiveLink>
        <div className={classes.signOutItem}>
          {auth ? (
            <ListItem button onClick={() => signOut()}>
              <div>
                <i
                  className="uil uil-x"
                  style={{ fontSize: "1.3vw", marginRight: 5 }}
                />
                Déconnexion
              </div>
            </ListItem>
          ) : (
            <ListItem button onClick={() => signOut()}>
              <div>
                <i
                  className="uil uil-x"
                  style={{ fontSize: "1.3vw", marginRight: 5 }}
                />
                Déconnexion
              </div>
            </ListItem>
          )}
        </div>
      </List>
    </div>
  );
};

export default SideBarSupervisor;
