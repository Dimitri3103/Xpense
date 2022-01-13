import React from "react";
import { List, ListItem } from "@material-ui/core";
import { useAuth } from "../../utils/firebase/auth";
import ActiveLink from "../utils/ActiveLink";
import sideBar from "../../styles/components/sideBar";
import { TaxIcon } from "../utils";

const SideBarAdmin = () => {
  const classes = sideBar();
  const { auth, signOut } = useAuth();

  return (
    <div className={classes.sideBar}>
      <List component="nav">
        <ActiveLink href="/admin">
          <ListItem button>
            <div>
              <i
                className="uil uil-apps"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Tableau de bord
            </div>
          </ListItem>
        </ActiveLink>
        {/* <ActiveLink href="/admin/expenses/list">
          <ListItem button>
            <div>
              <i
                className="uil uil-invoice"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Mes dépenses
            </div>
          </ListItem>
        </ActiveLink>
        <ActiveLink href="/admin/approvals">
          <ListItem button>
            <div>
              <i
                className="uil uil-usd-circle"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Approbations
            </div>
          </ListItem>
        </ActiveLink> */}
        <ActiveLink href="/admin/collaborators">
          <ListItem button>
            <div>
              <i
                className="uil uil-users-alt"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Collaborateurs
            </div>
          </ListItem>
        </ActiveLink>
        <ActiveLink href="/admin/groups">
          <ListItem button>
            <div>
              <i
                className="uil uil-object-group"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Groupes
            </div>
          </ListItem>
        </ActiveLink>
        <ActiveLink href="/admin/expenseTypes">
          <ListItem button>
            <div>
              <i
                className="uil uil-money-withdrawal"
                style={{ fontSize: "1.3vw", marginRight: 5 }}
              />
              Types de dépenses
            </div>
          </ListItem>
        </ActiveLink>
        <ActiveLink href="/admin/taxes">
          <ListItem button>
            <div>
              <TaxIcon style={{ fontSize: "1.3vw", marginRight: 5 }} />
              Taxes
            </div>
          </ListItem>
        </ActiveLink>
        <ActiveLink href="/admin/report">
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
        <ActiveLink href="/admin/settings">
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

export default SideBarAdmin;
