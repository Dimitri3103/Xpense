import React, { ChangeEvent, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import { DialogContent, Divider, Grid } from "@material-ui/core";
import { CloseButon, CommonDialogTitle } from "../../styles/dialogs";
import { a11yProps, TabPanel } from "../utils";
import inviteCollaboratorsGroup from "../../styles/components/inviteCollaboratorsGroup";
import { TitleDialog } from "../../styles/typography";
import { AddCollaborator, AddSupervisor } from "./addUserToGroup";
import {
  StyledTextField,
  InvitationTab,
  InvitationTabs,
} from "../../styles/others";

const InviteCollaborators = (props: any) => {
  const { open, handleClose, selected, org, users, loadGroups } = props;
  const classes = inviteCollaboratorsGroup();

  const [value, setValue] = useState(0);

  const [search, setSearch]: [string, (search: string) => void] = useState("");

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Dialog
      maxWidth="md"
      PaperProps={{
        style: {
          boxShadow: "0px 3px 23px #00000033",
          borderRadius: 16,
          width: "22%",
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <CommonDialogTitle id="form-dialog-title">
        <TitleDialog>Inviter des collaborateurs</TitleDialog>

        <CloseButon onClick={handleClose}>
          <i className="uil uil-times-circle" style={{ fontSize: "1.5vw" }} />
        </CloseButon>
      </CommonDialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <InvitationTabs value={value} onChange={handleChange}>
          <InvitationTab label="Responsable :" {...a11yProps(0)} />
          <InvitationTab label="Collaborateurs :" {...a11yProps(1)} />
        </InvitationTabs>
        <Divider />
        <Grid container>
          <Grid item xs={12} className={classes.searchBar}>
            <StyledTextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <i
                    className="uil uil-search"
                    style={{
                      color: "#9BABC5",
                      paddingLeft: 10,
                      paddingRight: 10,
                      fontSize: "1.3vw",
                    }}
                  />
                ),
              }}
            />
          </Grid>
        </Grid>
        <Divider />
        <TabPanel value={value} index={0}>
          <AddSupervisor
            classes={classes}
            users={users}
            org={org}
            selected={selected}
            search={search}
            loadGroups={loadGroups}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AddCollaborator
            classes={classes}
            users={users}
            org={org}
            selected={selected}
            search={search}
            loadGroups={loadGroups}
          />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default InviteCollaborators;
