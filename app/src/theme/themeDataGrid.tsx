import { createMuiTheme } from "@material-ui/core/styles";
import { frFR } from "@material-ui/data-grid";

const themeDataGrid = createMuiTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  frFR
);

export default themeDataGrid;
