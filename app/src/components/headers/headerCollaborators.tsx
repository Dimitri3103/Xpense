import { Grid } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { LabelSort, TitleHead } from "../../styles/typography";
import ReactHookFormSelect from "../ReactHookFormSelect";
import { a11yProps, GridViewIcon } from "../utils";
import {
  ViewTab,
  ViewTabs,
  ButtonBlue,
  MenuItemCRuD,
} from "../../styles/others";

export const HeaderCollaborators = (props) => {
  const { classes, value, handleChange, groups, handleAddMemberDialog } = props;
  const { control } = useForm();

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <TitleHead>Collaborateurs</TitleHead>
        </Grid>
        <Grid item xs={2}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <LabelSort>Trier par :</LabelSort>
            </Grid>
            <Grid item xs={8}>
              <ReactHookFormSelect
                className={classes.inputSort}
                defaultValue=""
                id="sort"
                name="sort"
                control={control}
              >
                <MenuItemCRuD value="name">Nom</MenuItemCRuD>
              </ReactHookFormSelect>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <LabelSort> Groupe :</LabelSort>
            </Grid>
            <Grid item xs={8}>
              <ReactHookFormSelect
                className={classes.inputSort}
                defaultValue=""
                id="group"
                name="group"
                control={control}
              >
                {groups.map((group) => (
                  <MenuItemCRuD key={group.id} value={group.id}>
                    {group.name}
                  </MenuItemCRuD>
                ))}
              </ReactHookFormSelect>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <LabelSort>Vue :</LabelSort>
            </Grid>
            <Grid item xs={8}>
              <ViewTabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    display: "none",
                  },
                }}
                variant="scrollable"
                scrollButtons="off"
              >
                <ViewTab
                  icon={<GridViewIcon style={{ fontSize: "1.3vw" }} />}
                  {...a11yProps(0)}
                />
                <ViewTab
                  icon={
                    <i
                      className="uil uil-list-ul"
                      style={{ fontSize: "2vw" }}
                    />
                  }
                  {...a11yProps(1)}
                />
              </ViewTabs>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <ButtonBlue
            className={classes.btnAddMembers}
            onClick={handleAddMemberDialog}
          >
            Invitez des membres
            <i className="uil uil-angle-right-b" />
          </ButtonBlue>
        </Grid>
      </Grid>
    </div>
  );
};
