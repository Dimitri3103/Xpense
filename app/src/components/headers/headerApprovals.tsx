import DateFnsUtils from "@date-io/date-fns";
import { Grid, IconButton } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import React from "react";
import { useForm } from "react-hook-form";
import { LabelSort, TitleHead } from "../../styles/typography";
import ReactHookFormSelect from "../ReactHookFormSelect";
import { a11yProps, GridViewIcon } from "../utils";
import {
  MenuItemCRuD,
  StyledDatePicker,
  ViewTab,
  ViewTabs,
} from "../../styles/others";
import { getGroups } from "../../services-back/admin/groupService";

export const HeaderApprovals = (props) => {
  const { classes, value, handleChange, org } = props;
  const { control } = useForm();
  const [groups, setGroups] = React.useState([]);

  const [selectedDate, handleDateChange] = React.useState<Date | null>(null);

  function loadGroups() {
    getGroups(org.id).then((groups) => {
      setGroups(groups);
    });
  }

  React.useEffect(() => {
    loadGroups();
  }, []);

  return (
    <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={5}>
          <TitleHead>Approbations</TitleHead>
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
              <ReactHookFormSelect
                className={classes.inputSort}
                defaultValue=""
                id="sort"
                name="sort"
                control={control}
              >
                <MenuItemCRuD value="ref">Référence</MenuItemCRuD>
                <MenuItemCRuD value="name">Nom</MenuItemCRuD>
                <MenuItemCRuD value="label">Libellé</MenuItemCRuD>
                <MenuItemCRuD value="date">Date</MenuItemCRuD>
                <MenuItemCRuD value="amount">Montant</MenuItemCRuD>
              </ReactHookFormSelect>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Grid container alignItems="center">
            <Grid item xs={4}>
              <LabelSort>Groupe :</LabelSort>
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
      </Grid>
    </div>
  );
};
