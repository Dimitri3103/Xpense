import { ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getSheets } from "../../services-back/sheetService";
import themeDataGrid from "../../theme/themeDataGrid";
import { getUsersByOrg } from "../../services-back/admin/userService";
import { Pagination } from "@material-ui/lab";
import { MenuIconTab } from "../utils";
import { styleDataGrid } from "../../styles/datagrid/datagrid";
import { styledPagination } from "../../styles/datagrid/pagination";
import { MenuApprovals } from "../utils/menu";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridComponentProps,
} from "@material-ui/data-grid";

const ListView = (org) => {
  const classes = styleDataGrid();
  const stylePag = styledPagination();

  const [menuExp, setMenuExp] = useState(null);

  const [selected, setSelected] = useState("");

  const isMenuOpen = Boolean(menuExp);

  const menuId = "expense-menu";

  const handleMenuClose = () => {
    setMenuExp(null);
  };

  const [sheets, setSheets] = useState([]);
  function loadSheets() {
    getSheets(org.id).then((res) =>
      setSheets(
        res.filter((sheet) => {
          return sheet.status === "pending";
        })
      )
    );
  }

  const [users, setUsers] = useState([]);
  function loadUsers() {
    getUsersByOrg(org.id).then((res) => setUsers(res));
  }

  useEffect(() => {
    loadSheets();
    loadUsers();
  }, []);

  let route = {
    pathname: `/sheet/approval/${selected}`,
    query: { org: org.id },
  };

  const columns: GridColDef[] = [
    {
      field: "userName",
      headerName: "Nom",
      flex: 0.6,
      renderCell: (params: GridCellParams) => (
        <>
          {users.map((user) =>
            user.id === params.row.userId ? (
              <div key={user.id}>{user.displayName}</div>
            ) : null
          )}
        </>
      ),
      filterable: false,
      sortable: false,
    },
    {
      field: "label",
      headerName: "Libellé",
      flex: 0.8,
      filterable: false,
      sortable: false,
    },
    {
      field: "creationDate",
      headerName: "Date",
      flex: 0.7,
      filterable: false,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Montant",
      flex: 0.7,
      filterable: false,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          {params.row.total}

          <MenuIconTab
            aria-controls={menuId}
            onClick={(event) => {
              setSelected(params.row.id);
              setMenuExp(event.currentTarget);
            }}
          />
          <MenuApprovals
            menuId={menuId}
            menuExp={menuExp}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
            route={route}
          />
        </>
      ),
    },
  ];

  const [currentPage, setPage] = useState(0);

  const CustomPagination = (props: GridComponentProps) => {
    const { rowCount, pageSize } = props;
    let pageCount = Math.ceil(rowCount / pageSize);
    return (
      <div className={stylePag.root}>
        <Pagination
          size="small"
          page={currentPage + 1}
          count={pageCount}
          onChange={(event, value) => setPage(value - 1)}
        />
      </div>
    );
  };

  return (
    <ThemeProvider theme={themeDataGrid}>
      <DataGrid
        rows={sheets}
        columns={columns}
        pageSize={10}
        page={currentPage}
        paginationMode="client"
        checkboxSelection
        className={classes.root}
        disableColumnMenu={true}
        autoHeight={true}
        hideFooterSelectedRowCount={true}
        disableSelectionOnClick={true}
        headerHeight={40}
        rowHeight={38}
        localeText={{ noRowsLabel: "Aucune note de frais à approuver" }}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          pagination: { rowCount: sheets.length, pageSize: 10 },
        }}
      />
    </ThemeProvider>
  );
};

export default ListView;
