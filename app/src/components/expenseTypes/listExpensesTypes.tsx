import { ThemeProvider } from "@material-ui/core";
import React, { useRef, useState } from "react";
import themeDataGrid from "../../theme/themeDataGrid";
import { Pagination } from "@material-ui/lab";
import { MenuIconTab } from "../utils";
import { styleDataGrid } from "../../styles/datagrid/datagrid";
import { styledPagination } from "../../styles/datagrid/pagination";
import { deleteExpenseType } from "../../services-back/admin/expenseTypeService";
import { MenuTabs } from "../utils/menu";
import { TaxExpTypeDialog } from "../dialogs/taxExpTypeDialog";
import { GetExpenseType } from "./updateExpenseTypeForm";
import ConfirmDialog from "../dialogs/confirmDialog";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridComponentProps,
} from "@material-ui/data-grid";
import ExpenseType from "../../models/expenseType";

const ListExpenseTypes = ({ org, expTypes, loadExpenseTypes }) => {
  const styleTab = styleDataGrid();
  const stylePag = styledPagination();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    loadExpenseTypes();
    handleMenuClose();
  };

  const removeExpenseType = (id) => {
    deleteExpenseType(org.id, id).then(() => {
      closeConfirmDialog();
    });
  };

  const [rowExpType, setRowExpType] = useState<ExpenseType | null>(null);

  const [menuExp, setMenuExp] = useState(null);
  const isMenuOpen = Boolean(menuExp);

  const menuId = "expense-menu";

  const handleMenuClose = () => {
    setMenuExp(null);
  };

  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const openUpdateDialog = () => {
    setUpdateDialogOpen(true);
  };
  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    handleMenuClose();
    loadExpenseTypes();
  };

  const childRef = useRef(null);

  const changeExpenseType = () => {
    childRef.current.changeExpenseType();
  };

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      flex: 0.5,
      filterable: false,
      sortable: false,
    },
    {
      field: "i18n",
      headerName: "Nom",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      field: "multiplicator",
      headerName: "Formule",
      flex: 0.5,
      filterable: false,
      sortable: false,
      renderCell: (params: GridCellParams) =>
        params.row.multiplicator
          ? params.row.multiplicator === 0
            ? "Pas de formule"
            : params.row.multiplicator
          : "Pas de formule",
    },
    {
      field: "status",
      headerName: "Statut",
      flex: 0.7,
      filterable: false,
      sortable: false,
    },
    {
      field: "",
      headerName: "",
      flex: 0.2,
      filterable: false,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          <MenuIconTab
            aria-controls={menuId}
            onClick={(event) => {
              setRowExpType(params.row);
              setMenuExp(event.currentTarget);
            }}
          />
          <MenuTabs
            menuId={menuId}
            anchorEl={menuExp}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
            openUpdateDialog={openUpdateDialog}
            expType={rowExpType}
            setConfirmDialog={setConfirmDialog}
            remove={removeExpenseType}
            nameAction="ce type de dépense"
          />
          <TaxExpTypeDialog
            isOpen={isUpdateDialogOpen}
            handleClose={closeUpdateDialog}
            title="Modifier un type de dépense"
            onSubmit={changeExpenseType}
            nameBtn="Sauvegarder"
          >
            <GetExpenseType
              expType={rowExpType}
              org={org}
              closeUpdateDialog={closeUpdateDialog}
              ref={childRef}
            />
          </TaxExpTypeDialog>
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
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
        rows={expTypes}
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
        localeText={{ noRowsLabel: "Aucun type de dépenses" }}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          pagination: { rowCount: expTypes.length, pageSize: 5 },
        }}
      />
    </ThemeProvider>
  );
};

export default ListExpenseTypes;
