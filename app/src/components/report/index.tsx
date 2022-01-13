import { Divider, Grid } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import chartExpense from "../../styles/components/chartExpense";
import { PaperChart, ChartTab, ChartTabs } from "../../styles/others";
import {
  ChartExpenses,
  ChartExpensesMonth,
  ChartExpensesYear,
} from "../dashboard/chart";
import { a11yProps, TabPanel } from "../utils";
import { ChartCollaborators } from "./chart";

const ChartRapport = () => {
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
                className={classes.gridChartContent}
                alignItems="center"
              >
                <ChartCollaborators />
              </Grid>
            </PaperChart>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ChartRapport;
