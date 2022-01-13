import React from "react";
import { CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import NavbarSupervisor from "../components/Navbar/NavbarSupervisor";
import theme from "../theme/theme";
import SideBarSupervisor from "../components/sidebars/SideBarSupervisor";
import layoutStyle from "../styles/components/layoutStyle";

const SupervisorLayout = ({ children }) => {
  const classes = layoutStyle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <NavbarSupervisor />
        <Grid className={classes.body}>
          <Grid item xs={2}>
            <SideBarSupervisor />
          </Grid>
          <Grid item xs={10}>
            {children}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default SupervisorLayout;
