import { ThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import themeDataGrid from "../../../theme/themeDataGrid";
import tabExpensesList from "../../../styles/components/tabExpensesList";
import { Pagination } from "@material-ui/lab";
import { MenuIconTab } from "../../utils";
import { Status } from "../../../styles/typography";
import { styleDataGrid } from "../../../styles/datagrid/datagrid";
import { styledPagination } from "../../../styles/datagrid/pagination";
import { MenuTabExpenses } from "../../utils/menu";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridComponentProps,
} from "@material-ui/data-grid";
import { deleteSheet } from "../../../services-back/sheetService";
import ConfirmDialog from "../../dialogs/confirmDialog";

const TabExpensesList = (props) => {
  const { org, sheets, loadSheets } = props;
  const classes = tabExpensesList();
  const styleTab = styleDataGrid();
  const stylePag = styledPagination();

  const [selected, setSelected] = useState("");

  const [menuExp, setMenuExp] = useState(null);
  const isMenuOpen = Boolean(menuExp);

  const menuId = "expense-menu";
  const handleMenuClose = () => {
    setMenuExp(null);
  };

  useEffect(() => {
    loadSheets();
  }, []);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    loadSheets();
    handleMenuClose();
  };

  const removeSheet = (id) => {
    deleteSheet(org.id, id).then(() => {
      closeConfirmDialog();
    });
  };

  let route = {
    pathname: `/sheet/user/${selected}`,
    query: { org: org.id },
  };

  let routeAddExpense = {
    pathname: `/sheet/user/add/${selected}`,
    query: { org: org.id },
  };

  const columns: GridColDef[] = [
    {
      field: "label",
      headerName: "Libellé",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      field: "creationDate",
      headerName: "Date",
      flex: 0.8,
      filterable: false,
      sortable: false,
    },
    {
      field: "total",
      headerName: "Montant",
      flex: 0.54,
      filterable: false,
      sortable: false,
    },
    {
      field: "",
      headerName: "",
      flex: 0.67,
      renderCell: (params: GridCellParams) => (
        <>
          <div>
            {params.row.status === "new" ? (
              <Status className={classes.statusNew}>Nouvelle</Status>
            ) : null}
            {params.row.status == "pending" ? (
              <Status className={classes.statusPending}>En attente</Status>
            ) : null}
            {params.row.status == "approved" ? (
              <Status className={classes.statusApproved}>Validée</Status>
            ) : null}
            {params.row.status == "declined" ? (
              <Status className={classes.statusDeclined}>Rejetée</Status>
            ) : null}
          </div>
          <MenuIconTab
            aria-controls={menuId}
            onClick={(event) => {
              setSelected(params.row.id);
              setMenuExp(event.currentTarget);
            }}
          />
          <MenuTabExpenses
            menuId={menuId}
            menuExp={menuExp}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
            route={route}
            routeAddExpense={routeAddExpense}
            setConfirmDialog={setConfirmDialog}
            remove={removeSheet}
            sheetId={selected}
          />

          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
      ),
      filterable: false,
      sortable: false,
    },
  ];

  const [currentPage, setPage] = useState(0);

  const CustomPagination = (props: GridComponentProps) => {
    const { rowCount, pageSize } = props;
    let pageCount = Math.ceil(rowCount / pageSize);
    return (
      <Pagination
        className={stylePag.root}
        size="small"
        page={currentPage + 1}
        count={pageCount}
        onChange={(event, value) => setPage(value - 1)}
      />
    );
  };

  return (
    <ThemeProvider theme={themeDataGrid}>
      <DataGrid
        rows={sheets}
        columns={columns}
        pageSize={5}
        page={currentPage}
        paginationMode="client"
        checkboxSelection
        className={styleTab.root}
        disableColumnMenu={true}
        autoHeight={true}
        hideFooterSelectedRowCount={true}
        disableSelectionOnClick={true}
        headerHeight={40}
        rowHeight={38}
        localeText={{ noRowsLabel: "Aucune note de frais" }}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          pagination: { rowCount: sheets.length, pageSize: 5 },
        }}
      />
    </ThemeProvider>
  );
};

export default TabExpensesList;
