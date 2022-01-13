import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Group from "../../models/group";
import { getGroups } from "../../services-back/admin/groupService";
import {
  createInvitation,
  getInvitations,
} from "../../services-back/admin/invitationService";
import { InviteDialog } from "../dialogs/inviteDialog";
import { HeaderCollaborators } from "../headers/headerCollaborators";
import InviteCollaborators from "./inviteCollaborator";
import ListInvitations from "../invitations/listInvitations";
import { TitleHead } from "../../styles/typography";
import { TabPanel } from "../utils";
import ListCollaborators from "./listCollaborators";
import { useAuth } from "../../utils/firebase/auth";
import ListViewCollaborators from "./listViewCollaborators";

const useStyles = makeStyles((theme) => ({
  inputSort: { width: "100%", font: "normal normal normal 80% Open Sans" },
  btnAddMembers: { width: "100%" },
}));

const Collaborators = ({ value, handleChange, org }) => {
  const classes = useStyles();

  const [isAddMemberOpen, setIsAddMemberOpen] = React.useState(false);
  const handleAddMemberDialogClose = () => {
    setIsAddMemberOpen(false);
    loadInvitations();
  };
  const handleAddMemberDialog = () => {
    setIsAddMemberOpen(true);
  };

  const [fields, setFields] = React.useState([
    {
      id: uuidv4(),
      email: "",
      roleId: "",
      groupId: "",
      status: "En attente",
      orgId: "org:simon",
    },
  ]);
  const handleChangeField = (id, event) => {
    const newFields = fields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setFields(newFields);
  };
  const handleAddFields = () => {
    setFields([
      ...fields,
      {
        id: uuidv4(),
        email: "",
        roleId: "",
        groupId: "",
        status: "En attente",
        orgId: "org:simon",
      },
    ]);
  };
  const handleRemoveFields = (id) => {
    const values = [...fields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setFields(values);
  };

  const { sendSignInLinkToEmail } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    fields.forEach((field) =>
      createInvitation(org.id, field).then(() => {
        sendSignInLinkToEmail(field.email);
        handleAddMemberDialogClose();
      })
    );
  };

  let groupsList: Group[] = [];
  const [groups, setGroups] = React.useState(groupsList);
  function loadGroups() {
    getGroups(org.id).then((groups) => {
      setGroups(groups);
    });
  }

  const [invitations, setInvitations] = React.useState([]);
  function loadInvitations() {
    getInvitations(org.id).then((res) =>
      setInvitations(
        res.filter((invit) => {
          return invit.status == "En attente";
        })
      )
    );
  }

  useEffect(() => {
    loadGroups();
    loadInvitations();
  }, []);

  return (
    <div>
      <HeaderCollaborators
        classes={classes}
        value={value}
        handleChange={handleChange}
        groups={groups}
        handleAddMemberDialog={handleAddMemberDialog}
      />
      <div style={{ marginTop: 5 }}>
        <TabPanel value={value} index={0}>
          <ListCollaborators {...org} />
          <br />
          <br />
          <TitleHead>Invitations en attente</TitleHead>
          <ListInvitations {...{ org, invitations, loadInvitations }} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListViewCollaborators {...org} />
          <br />
          <TitleHead>Invitations en attente</TitleHead>
          <ListInvitations {...{ org, invitations, loadInvitations }} />
        </TabPanel>
      </div>

      <InviteDialog
        isOpen={isAddMemberOpen}
        handleClose={handleAddMemberDialogClose}
        title="Nouvelle invitation"
        handleSubmit={handleSubmit}
      >
        <InviteCollaborators
          loadGroups={loadGroups}
          handleSubmit={handleSubmit}
          fields={fields}
          handleChangeField={handleChangeField}
          groups={groups}
          handleAddFields={handleAddFields}
          handleRemoveFields={handleRemoveFields}
        />
      </InviteDialog>
    </div>
  );
};

export default Collaborators;
