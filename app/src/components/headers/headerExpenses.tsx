import { Grid, IconButton } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { LabelSort, TitleHead } from "../../styles/typography";
import { a11yProps, GridViewIcon } from "../utils";
import DateFnsUtils from "@date-io/date-fns";
import {
  ButtonBlue,
  SelectIcon,
  StyledSelect,
  StyledDatePicker,
  ViewTab,
  ViewTabs,
  MenuItemCRuD,
} from "../../styles/others";

export const HeaderExpenses = (props) => {
  const { classes, value, handleChange, handleAddSheet } = props;

  const [selectedDate, handleDateChange] = React.useState<Date | null>(null);

  const [sort, setSort] = React.useState("");
  const handleChangeSort = (event) => {
    setSort(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <TitleHead>Mes notes de frais</TitleHead>
        </Grid>
        <Grid item xs={2}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <LabelSort>Période : </LabelSort>
            </Grid>
            <Grid item xs={8}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <StyledDatePicker
                  autoOk
                  animateYearScrolling
                  variant="inline"
                  value={selectedDate}
                  onChange={(date) => handleDateChange(date)}
                  format="MM/dd/yyyy"
                  id="date-picker-inline"
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <IconButton size="small">
                        <i
                          className="uil uil-calender"
                          style={{ fontSize: "1.2vw", color: "#9BABC5" }}
                        />
                      </IconButton>
                    ),
                    className: classes.inputDatePicker,
                  }}
                  className={classes.datePicker}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
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
                <MenuItemCRuD value="label">Libellé</MenuItemCRuD>
                <MenuItemCRuD value="date">Date</MenuItemCRuD>
                <MenuItemCRuD value="amount">Montant</MenuItemCRuD>
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
        <Grid item xs={3}>
          <ButtonBlue
            className={classes.btnAddExpense}
            onClick={handleAddSheet}
          >
            Nouvelle note de frais
            <span className={classes.separator}></span>
            <i className="uil uil-angle-down" />
          </ButtonBlue>
        </Grid>
      </Grid>
    </div>
  );
};
