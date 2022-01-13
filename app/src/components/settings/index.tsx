import { Divider, Grid, Tabs } from "@material-ui/core";
import React from "react";
import { SettingsTab } from "../../styles/others";
import { TitleSetting } from "../../styles/typography";
import { a11yProps, TabPanel } from "../utils";

export const SettingsContainer = (props) => {
  const { classes, value, handleChange, handleChangeName } = props;
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={2}>
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
              label="Paramètres du compte"
              {...a11yProps(0)}
              onClick={() => handleChangeName("Paramètres du compte")}
            />
            <SettingsTab
              label="Mot de passe"
              {...a11yProps(1)}
              onClick={() => handleChangeName("Mot de passe")}
            />
          </Tabs>
        </Grid>
        <Divider orientation="vertical" />
        <Grid item xs={9}>
          <TabPanel value={value} index={0}>
            <TitleSetting>Paramètres du compte</TitleSetting>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TitleSetting> Mot de passe</TitleSetting>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};
