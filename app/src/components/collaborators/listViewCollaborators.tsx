import { Avatar, makeStyles, ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getGroups } from "../../services-back/admin/groupService";
import themeDataGrid from "../../theme/themeDataGrid";
import { getUsersByOrg } from "../../services-back/admin/userService";
import { Pagination } from "@material-ui/lab";
import { MenuIconTab } from "../utils";
import { styleDataGrid } from "../../styles/datagrid/datagrid";
import { styledPagination } from "../../styles/datagrid/pagination";
import { MenuCollaborators } from "../utils/menu";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridComponentProps,
} from "@material-ui/data-grid";

const ListViewCollaborators = (org) => {
  const classes = styleDataGrid();
  const stylePag = styledPagination();

  const [menuExp, setMenuExp] = useState(null);

  const [selected, setSelected] = useState("");

  const isMenuOpen = Boolean(menuExp);

  const menuId = "collaborators-menu";

  const handleMenuClose = () => {
    setMenuExp(null);
  };

  const [users, setUsers] = useState([]);
  function loadUsers() {
    getUsersByOrg(org.id).then((res) =>
      setUsers(
        res.filter((user) => {
          return user.email != "ndimitri.ngoutouga1@gmail.com";
        })
      )
    );
  }

  const [groups, setGroups] = useState([]);
  function loadGroups() {
    getGroups(org.id).then((res) => setGroups(res));
  }

  useEffect(() => {
    loadUsers();
    loadGroups();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "",
      headerName: "",
      flex: 0.2,
      filterable: false,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          <Avatar style={{ width: 24, height: 24 }} src={params.row.photoURL} />
        </>
      ),
    },
    {
      field: "displayName",
      headerName: "Nom",
      flex: 0.7,
      filterable: false,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.7,
      filterable: false,
      sortable: false,
    },
    {
      field: "group",
      headerName: "Groupe",
      flex: 0.7,
      filterable: false,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          {groups.map((group) =>
            group.members.includes(params.row.id) ? (
              <div key={group.id} style={{ marginRight: 5 }}>
                {group.name}
              </div>
            ) : null
          )}

          <MenuIconTab
            aria-controls={menuId}
            onClick={(event) => {
              setSelected(params.row.id);
              setMenuExp(event.currentTarget);
            }}
          />
          <MenuCollaborators
            menuId={menuId}
            anchorEl={menuExp}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
            classes={classes}
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
        rows={users}
        columns={columns}
        pageSize={5}
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
        localeText={{ noRowsLabel: "Pas de collaborateurs" }}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          pagination: { rowCount: users.length, pageSize: 5 },
        }}
      />
    </ThemeProvider>
  );
};

export default ListViewCollaborators;
