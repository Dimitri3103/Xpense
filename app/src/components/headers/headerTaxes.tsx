import { Grid } from "@material-ui/core";
import React from "react";
import {
  ButtonBlue,
  MenuItemCRuD,
  SelectIcon,
  StyledSelect,
  ViewTab,
  ViewTabs,
} from "../../styles/others";
import { LabelSort, TitleHead } from "../../styles/typography";
import { a11yProps, GridViewIcon } from "../utils";

const HeaderExpTypes = (props) => {
  const { classes, value, handleChange, handleAddTaxes } = props;

  const [sort, setSort] = React.useState("");
  const handleChangeSort = (event) => {
    setSort(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={7}>
          <TitleHead>Liste des taxes</TitleHead>
        </Grid>
        <Grid item xs={2}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <LabelSort>Trier par :</LabelSort>
            </Grid>
            <Grid item xs={8}>
              <StyledSelect
                IconComponent={SelectIcon}
                displayEmpty
                disableUnderline
                className={classes.inputSort}
                name="sort"
                value={sort}
                onChange={(event) => handleChangeSort(event)}
              >
                <MenuItemCRuD value="code">Code</MenuItemCRuD>
                <MenuItemCRuD value="defaultRate">Taux</MenuItemCRuD>
                <MenuItemCRuD value="i18n">Nom</MenuItemCRuD>
              </StyledSelect>
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
          <ButtonBlue className={classes.btnAddTaxes} onClick={handleAddTaxes}>
            Ajouter des taxes <i className="uil uil-angle-right-b"></i>
          </ButtonBlue>
        </Grid>
      </Grid>
    </div>
  );
};

export default HeaderExpTypes;
