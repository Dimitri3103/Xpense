import React from "react";
import { CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import theme from "../theme/theme";
import SideBarAdmin from "../components/sidebars/SidebarAdmin";
import layoutStyle from "../styles/components/layoutStyle";

const AdminLayout = ({ children }) => {
  const classes = layoutStyle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <NavbarAdmin />
        <Grid className={classes.body}>
          <Grid item xs={2}>
            <SideBarAdmin />
          </Grid>
          <Grid item xs={10}>
           {children}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
