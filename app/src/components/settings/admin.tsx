import { Divider, Grid, Tabs } from "@material-ui/core";
import { plainToClass } from "class-transformer";
import React from "react";
import Org from "../../models/org";
import { getUserOrganization } from "../../services-back/orgService";
import { SettingsTab } from "../../styles/others";
import { TitleSetting } from "../../styles/typography";
import { a11yProps, TabPanel } from "../utils";
import { UpdateOrgForm } from "./updateOrgForm";

export const SettingsContainerAdmin = (props) => {
  const { classes, value, handleChange, handleChangeName } = props;

  const [org, setOrg] = React.useState(null);

  if (!org) {
    getUserOrganization().then((org) => {
      const organization = plainToClass(Org, org);
      setOrg(organization);
    });
  }

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
          >
            <SettingsTab
              label="Paramètres de l'organisation"
              {...a11yProps(0)}
              onClick={() => handleChangeName("Paramètres de l'organisation")}
            />
            <SettingsTab
              label="Mot de passe"
              {...a11yProps(1)}
              onClick={() => handleChangeName("Mot de passe")}
            />
          </Tabs>
        </Grid>
        <Divider orientation="vertical" />
        <Grid item xs={8}>
          <TabPanel value={value} index={0}>
            <br />
            {org ? <UpdateOrgForm {...org} /> : <div></div>}
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TitleSetting> Mot de passe</TitleSetting>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};
