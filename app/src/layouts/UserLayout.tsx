import React from "react";
import { CssBaseline, Grid, ThemeProvider } from "@material-ui/core";
import NavbarUser from "../components/Navbar/NavbarUser";
import theme from "../theme/theme";
import SideBarUser from "../components/sidebars/SideBarUser";
import layoutStyle from "../styles/components/layoutStyle";

const UserLayout = ({ children }) => {
  const classes = layoutStyle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <NavbarUser />
        <Grid className={classes.body}>
          <Grid item xs={2}>
            <SideBarUser />
          </Grid>
          <Grid item xs={10}>
            {children}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default UserLayout;
