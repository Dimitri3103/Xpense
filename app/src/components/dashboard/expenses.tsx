import { Divider, Grid } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import chartExpense from "../../styles/components/chartExpense";
import { PaperChart, ChartTab, ChartTabs } from "../../styles/others";
import { a11yProps, TabPanel } from "../utils";
import { ChartExpenses, ChartExpensesMonth, ChartExpensesYear } from "./chart";
import PendingExpenses from "./pending";

const Expenses = (org) => {
  const classes = chartExpense();

  const [value, setValue] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.gridChart}>
        <Grid item container>
          <Grid item xs={9}>
            <PaperChart className={classes.chart}>
              <Grid
                container
                alignItems="center"
                className={classes.gridChartHead}
              >
                <Grid item xs={6}>
                  <span className={classes.textChart}>Notes de frais</span>
                </Grid>
                <Grid item xs={5}>
                  <ChartTabs
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{
                      style: {
                        display: "none",
                      },
                    }}
                  >
                    <ChartTab label="Cette semaine" {...a11yProps(0)} />
                    <ChartTab label="Ce mois" {...a11yProps(1)} />
                    <ChartTab label="Cette année" {...a11yProps(2)} />
                  </ChartTabs>
                </Grid>
              </Grid>
              <Divider />
              <Grid item xs={12}>
                <TabPanel value={value} index={0}>
                  <ChartExpenses />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ChartExpensesMonth />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ChartExpensesYear />
                </TabPanel>
              </Grid>
            </PaperChart>
          </Grid>

          <Grid item xs={3}>
            <PaperChart className={classes.pending}>
              <Grid
                container
                alignItems="center"
                className={classes.gridChartHead}
              >
                <span className={classes.textChart}>
                  Notes de frais en attente
                </span>
              </Grid>
              <Divider />
              <Grid
                container
                alignItems="center"
                className={classes.gridChartBody}
              >
                <Grid item xs={6}>
                  <div className={classes.ColDate}>
                    Collaborateurs <i className="uil uil-direction" />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className={classes.ColDate}>
                    Date d'envoi <i className="uil uil-direction" />
                  </div>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                container
                className={classes.gridChartContent}
                alignItems="center"
              >
                <PendingExpenses {...org} />
              </Grid>
              <Divider />

              <Grid container>
                <span className={classes.moreText}>
                  Voir toutes les notes de frais
                  <i className="uil uil-angle-right-b" />
                </span>
              </Grid>
            </PaperChart>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Expenses;
